"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { trackEvent } from "@/lib/analytics";
import {
  QUOTE_SERVICES,
  fieldErrors,
  quoteSchema,
  type QuoteField,
  type QuoteFieldErrors,
  type QuoteServiceValue,
} from "@/lib/quote-schema";
import type { ContactResponse } from "@/lib/contact-handler";
import styles from "./quoteForm.module.css";

type Props = {
  communes: string[];
  defaultService?: QuoteServiceValue;
  defaultCommune?: string;
  /** Identifiant de l'emplacement (mesure des conversions). */
  location: string;
  phoneDisplay: string;
  phoneHref: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const FIELD_ORDER: QuoteField[] = ["service", "commune", "name", "phone", "email", "message"];

export function QuoteForm({ communes, defaultService, defaultCommune, location, phoneDisplay, phoneHref }: Props) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const startedAt = useRef<number>(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const [message, setMessage] = useState("");

  // Pré-remplissage depuis l'URL (/contact?commune=Thuir&service=bureaux),
  // lu côté client pour que la page reste statique.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const params = new URLSearchParams(window.location.search);
    const commune = params.get("commune");
    const service = params.get("service");
    const communeInput = form.elements.namedItem("commune");
    if (commune && communeInput instanceof HTMLInputElement && !communeInput.value) {
      communeInput.value = commune.slice(0, 80);
    }
    if (service && QUOTE_SERVICES.some((s) => s.value === service)) {
      const radio = form.querySelector<HTMLInputElement>(`input[name="service"][value="${service}"]`);
      if (radio) radio.checked = true;
    }
  }, []);

  const id = (name: string) => `${uid}-${name}`;
  const describedBy = (name: QuoteField, hint?: boolean) =>
    [hint ? id(`${name}-hint`) : null, errors[name] ? id(`${name}-error`) : null].filter(Boolean).join(" ") || undefined;

  // Horodatage de la première interaction (contrôle anti-robot côté serveur).
  const markStart = () => {
    if (!startedAt.current) startedAt.current = Date.now();
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const values = Object.fromEntries(FIELD_ORDER.map((k) => [k, String(fd.get(k) ?? "")]));

    const parsed = quoteSchema.safeParse(values);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      setStatus("error");
      setMessage("Certains champs sont à corriger.");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});
    setMessage("");
    setStatus("submitting");
    trackEvent("quote_submit", { location, service: parsed.data.service });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: String(fd.get("website") ?? ""),
          startedAt: startedAt.current || Date.now(),
          turnstileToken: fd.get("cf-turnstile-response")?.toString(),
        }),
      });
      const data = (await res.json().catch(() => null)) as ContactResponse | null;

      if (res.ok && data?.ok) {
        setStatus("success");
        setMessage(data.message);
        trackEvent("quote_success", { location, service: parsed.data.service }, `quote-${startedAt.current}`);
        form.reset();
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }

      setStatus("error");
      setErrors(data && !data.ok && data.fieldErrors ? data.fieldErrors : {});
      setMessage(data?.message ?? `L'envoi a échoué. Vous pouvez nous appeler au ${phoneDisplay}.`);
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setStatus("error");
      setMessage(`Connexion impossible. Vérifiez votre réseau ou appelez-nous au ${phoneDisplay}.`);
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon} aria-hidden="true">
          <Icon name="check" />
        </span>
        <h3 ref={successRef} tabIndex={-1} className={styles.successTitle}>
          Demande envoyée
        </h3>
        <p>{message}</p>
        <p className={styles.successNote}>
          Pour une situation urgente, appelez-nous directement au <a href={phoneHref}>{phoneDisplay}</a>.
        </p>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => {
            startedAt.current = 0;
            setStatus("idle");
            setMessage("");
          }}
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  const errorList = FIELD_ORDER.filter((f) => errors[f]);

  return (
    <form ref={formRef} className={styles.form} noValidate onSubmit={onSubmit} onFocus={markStart} aria-busy={status === "submitting"}>
      <div ref={summaryRef} tabIndex={-1} className={styles.summary} aria-live="assertive" role={message ? "alert" : undefined}>
        {status === "error" && message ? (
          <>
            <p className={styles.summaryTitle}>{message}</p>
            {errorList.length > 0 ? (
              <ul>
                {errorList.map((f) => (
                  <li key={f}>
                    <a href={`#${id(f)}`}>{errors[f]}</a>
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : null}
      </div>

      <fieldset className={styles.fieldset} aria-describedby={errors.service ? id("service-error") : undefined}>
        <legend className={styles.label}>
          Type d&apos;intervention <span className={styles.req} aria-hidden="true">*</span>
        </legend>
        <div className={`${styles.chips} ${errors.service ? styles.chipsInvalid : ""}`} id={id("service")}>
          {QUOTE_SERVICES.map((s) => (
            <label key={s.value} className={styles.chip}>
              <input
                type="radio"
                name="service"
                value={s.value}
                defaultChecked={s.value === defaultService}
                required
              />
              <span>{s.label}</span>
            </label>
          ))}
        </div>
        {errors.service ? (
          <p id={id("service-error")} className={styles.error}>
            {errors.service}
          </p>
        ) : null}
      </fieldset>

      <div className={styles.grid}>
        <Field id={id("commune")} label="Commune d'intervention" error={errors.commune} errorId={id("commune-error")}>
          <input
            id={id("commune")}
            name="commune"
            type="text"
            list={id("communes")}
            autoComplete="address-level2"
            defaultValue={defaultCommune}
            required
            maxLength={80}
            aria-invalid={errors.commune ? true : undefined}
            aria-describedby={describedBy("commune")}
            className={styles.input}
          />
          <datalist id={id("communes")}>
            {communes.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>

        <Field id={id("name")} label="Nom et prénom" error={errors.name} errorId={id("name-error")}>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={styles.input}
          />
        </Field>

        <Field id={id("phone")} label="Téléphone" error={errors.phone} errorId={id("phone-error")}>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={20}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("phone")}
            className={styles.input}
          />
        </Field>

        <Field id={id("email")} label="Adresse e-mail" error={errors.email} errorId={id("email-error")}>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={120}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={styles.input}
          />
        </Field>
      </div>

      <Field
        id={id("message")}
        label="Votre besoin"
        hint="Type de lieu, surface approximative, situation, délais souhaités…"
        hintId={id("message-hint")}
        error={errors.message}
        errorId={id("message-error")}
      >
        <textarea
          id={id("message")}
          name="message"
          rows={6}
          required
          maxLength={4000}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", true)}
          className={`${styles.input} ${styles.textarea}`}
        />
      </Field>

      {/* Pot de miel : invisible pour les humains, rempli par les robots. */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor={id("website")}>Ne pas remplir ce champ</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {turnstileSiteKey ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-language="fr" />
        </>
      ) : null}

      <p className={styles.legal}>
        Les informations transmises servent uniquement à traiter votre demande de devis.{" "}
        <Link href="/confidentialite">En savoir plus sur vos données</Link>.
      </p>

      <div className={styles.submitRow}>
        <button type="submit" className="btn btn-dark" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <span className={styles.spinner} aria-hidden="true" /> Envoi en cours…
            </>
          ) : (
            <>
              Envoyer ma demande <Icon name="arrow" />
            </>
          )}
        </button>
        <p className={styles.or}>
          ou appelez le <a href={phoneHref}>{phoneDisplay}</a>
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === "submitting" ? "Envoi de votre demande en cours." : ""}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  hintId,
  error,
  errorId,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  hintId?: string;
  error?: string;
  errorId: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.field} ${error ? styles.invalid : ""}`}>
      <label htmlFor={id} className={styles.label}>
        {label} <span className={styles.req} aria-hidden="true">*</span>
      </label>
      {hint ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
