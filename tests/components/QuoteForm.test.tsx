// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { QuoteForm } from "@/components/forms/QuoteForm";

const props = {
  communes: ["Perpignan", "Pia", "Cabestany"],
  location: "test",
  phoneDisplay: "06 28 28 69 67",
  phoneHref: "tel:+33628286967",
};

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByLabelText("Nettoyage de logement"));
  await user.type(screen.getByLabelText(/Commune d'intervention/), "Pia");
  await user.type(screen.getByLabelText(/Nom et prénom/), "Jean Martin");
  await user.type(screen.getByLabelText(/Téléphone/), "0612345678");
  await user.type(screen.getByLabelText(/Adresse e-mail/), "jean@example.fr");
  await user.type(screen.getByLabelText(/Votre besoin/), "Nettoyage approfondi d'une maison de 90 m².");
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("QuoteForm", () => {
  it("affiche les erreurs de validation sans appeler l'API", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<QuoteForm {...props} />);

    await user.click(screen.getByRole("button", { name: /Envoyer ma demande/ }));

    expect(await screen.findByText("Certains champs sont à corriger.")).toBeTruthy();
    expect(screen.getAllByText("Choisissez le type d'intervention.").length).toBeGreaterThan(0);
    const phone = screen.getByLabelText(/Téléphone/);
    expect(phone.getAttribute("aria-invalid")).toBe("true");
    expect(phone.getAttribute("aria-describedby")).toMatch(/phone-error/);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("envoie la demande et affiche la confirmation", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ ok: true, message: "Merci, c'est envoyé." })));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<QuoteForm {...props} />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /Envoyer ma demande/ }));

    expect(await screen.findByRole("heading", { name: "Demande envoyée" })).toBeTruthy();
    expect(screen.getByText("Merci, c'est envoyé.")).toBeTruthy();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/contact");
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({ service: "particuliers", commune: "Pia", website: "" });
    expect(typeof body.startedAt).toBe("number");
  });

  it("affiche le message d'erreur du serveur et les erreurs par champ", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({ ok: false, message: "Certains champs sont à corriger.", fieldErrors: { email: "Adresse refusée." } }),
            { status: 422 },
          ),
      ),
    );
    const user = userEvent.setup();
    render(<QuoteForm {...props} />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /Envoyer ma demande/ }));

    await waitFor(() => expect(screen.getAllByText("Adresse refusée.").length).toBeGreaterThan(0));
  });

  it("propose le téléphone en cas d'erreur réseau", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("Failed to fetch");
      }),
    );
    const user = userEvent.setup();
    render(<QuoteForm {...props} />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /Envoyer ma demande/ }));

    expect(await screen.findByText(/Connexion impossible.*06 28 28 69 67/)).toBeTruthy();
  });

  it("pré-sélectionne la prestation et la commune transmises", () => {
    render(<QuoteForm {...props} defaultService="diogene" defaultCommune="Cabestany" />);
    expect((screen.getByLabelText("Logement encombré (syndrome de Diogène)") as HTMLInputElement).checked).toBe(true);
    expect((screen.getByLabelText(/Commune d'intervention/) as HTMLInputElement).value).toBe("Cabestany");
  });
});
