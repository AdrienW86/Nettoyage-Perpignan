"use client";

import Link from "next/link";
import { useDeferredValue, useId, useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./communeSearch.module.css";

export type CommuneOption = {
  name: string;
  slug: string;
  postalCodes: string[];
  distanceKm: number | null;
  hasPage: boolean;
  served: boolean;
  key: string;
};

const MAX_RESULTS = 10;

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Recherche instantanée parmi les communes du département (nom ou code postal). */
export function CommuneSearch({ communes }: { communes: CommuneOption[] }) {
  const id = useId();
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);

  const results = useMemo(() => {
    const q = normalize(deferred);
    if (q.length < 2) return [];
    const isPostal = /^\d+$/.test(q.replace(/\s/g, ""));
    return communes
      .filter((c) => (isPostal ? c.postalCodes.some((p) => p.startsWith(q.replace(/\s/g, ""))) : c.key.includes(q)))
      .sort((a, b) => Number(b.key.startsWith(q)) - Number(a.key.startsWith(q)) || a.name.localeCompare(b.name, "fr"))
      .slice(0, MAX_RESULTS);
  }, [communes, deferred]);

  const tooShort = normalize(query).length < 2;

  return (
    <div className={styles.search}>
      <label htmlFor={`${id}-q`} className={styles.label}>
        Rechercher votre commune
      </label>
      <div className={styles.inputWrap}>
        <Icon name="search" className={styles.icon} />
        <input
          id={`${id}-q`}
          type="search"
          inputMode="search"
          autoComplete="off"
          placeholder="Nom ou code postal, ex. Thuir, 66300"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-describedby={`${id}-status`}
          className={styles.input}
        />
      </div>
      <p id={`${id}-status`} className="sr-only" aria-live="polite">
        {tooShort ? "" : `${results.length} commune${results.length > 1 ? "s" : ""} trouvée${results.length > 1 ? "s" : ""}.`}
      </p>

      {!tooShort ? (
        results.length > 0 ? (
          <ul role="list" className={styles.results}>
            {results.map((c) => (
              <li key={c.slug} className={styles.result}>
                <div>
                  <p className={styles.name}>{c.name}</p>
                  <p className={styles.meta}>
                    {c.postalCodes.join(", ")}
                    {c.distanceKm !== null ? ` · ${c.distanceKm} km de notre siège (à vol d'oiseau)` : ""}
                  </p>
                </div>
                {c.hasPage ? (
                  <Link href={`/zones-intervention/${c.slug}`} className={styles.action}>
                    Voir la page <Icon name="arrow" />
                  </Link>
                ) : (
                  <Link href={`/contact?commune=${encodeURIComponent(c.name)}`} className={styles.actionAlt}>
                    {c.served ? "Demander un devis" : "Vérifier la disponibilité"}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>
            Aucune commune des Pyrénées-Orientales ne correspond à « {query} ».
          </p>
        )
      ) : null}
    </div>
  );
}
