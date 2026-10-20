import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { Marked, type Tokens } from "marked";
import { articles as metas } from "@/data/articles";
import type { Article } from "@/types/content";

/**
 * Chargement et rendu des guides (Markdown → HTML), exclusivement côté
 * serveur et au moment du build : aucun JavaScript n'est envoyé au
 * navigateur pour afficher un article.
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "conseils");
const WORDS_PER_MINUTE = 200;

export type TocItem = { id: string; text: string };

export function slugifyHeading(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readSource(slug: string): string {
  return readFileSync(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
}

function readingMinutes(markdown: string): number {
  const words = markdown.replace(/[#>*|`[\]()-]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

const all: Article[] = metas.map((meta) => ({ ...meta, readingMinutes: readingMinutes(readSource(meta.slug)) }));
const bySlug = new Map(all.map((a) => [a.slug, a]));

export function getAllArticles(): Article[] {
  return [...all].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.title.localeCompare(b.title, "fr"));
}

export function getArticle(slug: string): Article | undefined {
  return bySlug.get(slug);
}

export function getLatestArticles(count: number): Article[] {
  return getAllArticles().slice(0, count);
}

export function renderArticle(slug: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();

  const marked = new Marked({
    gfm: true,
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Heading["tokens"]) => string } }, { tokens, depth, text }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        let id = slugifyHeading(text);
        while (used.has(id)) id = `${id}-2`;
        used.add(id);
        if (depth === 2) toc.push({ id, text });
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
      link(this: { parser: { parseInline: (t: Tokens.Link["tokens"]) => string } }, { href, title, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href);
        const titleAttr = title ? ` title="${title}"` : "";
        return external
          ? `<a href="${href}"${titleAttr} target="_blank" rel="noopener">${inner}<span class="sr-only"> (nouvel onglet)</span></a>`
          : `<a href="${href}"${titleAttr}>${inner}</a>`;
      },
    },
  });

  const html = marked.parse(readSource(slug), { async: false });
  return { html, toc };
}
