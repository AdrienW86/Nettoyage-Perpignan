import { describe, expect, it, vi } from "vitest";
import { createMemoryLimiter, createRedisLimiter, hashIdentifier } from "@/lib/rate-limit";

describe("createMemoryLimiter", () => {
  it("autorise jusqu'au maximum puis bloque, et se réinitialise après la fenêtre", async () => {
    let t = 0;
    const limiter = createMemoryLimiter(2, 60, () => t);
    expect((await limiter.hit("a")).allowed).toBe(true);
    expect((await limiter.hit("a")).allowed).toBe(true);
    const third = await limiter.hit("a");
    expect(third.allowed).toBe(false);
    expect(third.resetInSeconds).toBe(60);
    expect((await limiter.hit("b")).allowed).toBe(true);
    t = 61_000;
    expect((await limiter.hit("a")).allowed).toBe(true);
  });
});

describe("createRedisLimiter", () => {
  it("interprète la réponse pipeline d'Upstash", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify([{ result: 6 }, { result: 0 }, { result: 1200 }])));
    const limiter = createRedisLimiter("https://redis.example", "token", 5, 3600, fetchMock as unknown as typeof fetch);
    const result = await limiter.hit("abc");
    expect(result).toEqual({ allowed: false, remaining: 0, resetInSeconds: 1200 });
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://redis.example/pipeline");
    expect(init.headers).toMatchObject({ Authorization: "Bearer token" });
    expect(JSON.parse(String(init.body))[0]).toEqual(["INCR", "np:quote:abc"]);
  });

  it("lève une erreur si Redis répond en erreur", async () => {
    const fetchMock = vi.fn(async () => new Response("nope", { status: 500 }));
    const limiter = createRedisLimiter("https://redis.example", "t", 5, 60, fetchMock as unknown as typeof fetch);
    await expect(limiter.hit("x")).rejects.toThrow(/HTTP 500/);
  });
});

describe("hashIdentifier", () => {
  it("produit une empreinte stable qui ne contient pas l'IP", async () => {
    const a = await hashIdentifier("203.0.113.7");
    expect(a).toBe(await hashIdentifier("203.0.113.7"));
    expect(a).not.toContain("203");
    expect(a).toMatch(/^[0-9a-f]{32}$/);
  });
});
