import { describe, expect, it, vi } from "vitest";
import { createContactHandler } from "@/lib/contact-handler";
import { createMemoryLimiter } from "@/lib/rate-limit";

const NOW = 1_800_000_000_000;

const payload = {
  service: "particuliers",
  commune: "Pia",
  name: "Jean Martin",
  phone: "06 12 34 56 78",
  email: "jean@example.fr",
  message: "Nettoyage approfondi d'une maison de 90 m² avant emménagement.",
  website: "",
  startedAt: NOW - 20_000,
};

function setup(overrides: Partial<Parameters<typeof createContactHandler>[0]> = {}) {
  const send = vi.fn(async () => undefined);
  const handler = createContactHandler({
    limiter: createMemoryLimiter(5, 3600, () => NOW),
    send,
    verifyCaptcha: async () => true,
    now: () => NOW,
    ...overrides,
  });
  return { handler, send };
}

function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", host: "localhost:3000", "x-forwarded-for": "203.0.113.1", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  it("envoie l'e-mail et répond 200 pour une demande valide", async () => {
    const { handler, send } = setup();
    const res = await handler(request(payload));
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ok: true });
    expect(send).toHaveBeenCalledOnce();
    const [email, replyTo] = send.mock.calls[0] as unknown as [{ subject: string }, { address: string }];
    expect(email.subject).toContain("Pia");
    expect(replyTo.address).toBe("jean@example.fr");
  });

  it("simule un succès sans envoyer si le pot de miel est rempli", async () => {
    const { handler, send } = setup();
    const res = await handler(request({ ...payload, website: "http://spam.example" }));
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it("refuse un envoi trop rapide", async () => {
    const { handler, send } = setup();
    const res = await handler(request({ ...payload, startedAt: NOW - 500 }));
    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("renvoie les erreurs par champ en 422", async () => {
    const { handler } = setup();
    const res = await handler(request({ ...payload, phone: "123", message: "court" }));
    expect(res.status).toBe(422);
    const body = await res.json();
    expect(body.fieldErrors).toHaveProperty("phone");
    expect(body.fieldErrors).toHaveProperty("message");
  });

  it("limite le nombre de demandes par adresse IP", async () => {
    const { handler } = setup({ limiter: createMemoryLimiter(1, 3600, () => NOW) });
    expect((await handler(request(payload))).status).toBe(200);
    const res = await handler(request(payload));
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBe("3600");
  });

  it("refuse une origine étrangère", async () => {
    const { handler } = setup();
    const res = await handler(request(payload, { origin: "https://evil.example" }));
    expect(res.status).toBe(403);
  });

  it("refuse un contenu non JSON", async () => {
    const { handler } = setup();
    const res = await handler(request("a=b", { "content-type": "application/x-www-form-urlencoded" }));
    expect(res.status).toBe(415);
  });

  it("refuse un JSON invalide", async () => {
    const { handler } = setup();
    expect((await handler(request("{oops"))).status).toBe(400);
  });

  it("refuse une requête trop volumineuse", async () => {
    const { handler } = setup();
    const res = await handler(request({ ...payload, message: "x".repeat(20_000) }));
    expect(res.status).toBe(413);
  });

  it("refuse si la vérification anti-robot échoue", async () => {
    const { handler, send } = setup({ verifyCaptcha: async () => false });
    const res = await handler(request(payload));
    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("renvoie 502 avec une solution de repli si l'envoi échoue", async () => {
    const { handler } = setup({
      send: vi.fn(async () => {
        throw new Error("SMTP down");
      }),
    });
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const res = await handler(request(payload));
    expect(res.status).toBe(502);
    expect((await res.json()).message).toMatch(/06 28 28 69 67/);
  });

  it("n'est pas bloqué par une panne du limiteur", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const { handler } = setup({
      limiter: {
        kind: "redis",
        hit: async () => {
          throw new Error("Redis down");
        },
      },
    });
    expect((await handler(request(payload))).status).toBe(200);
  });
});
