import type { ReactNode } from "react";
import { formatDate } from "@/lib/format";
import { PageHero } from "./PageHero";

type Props = { title: string; path: string; updatedAt: string; intro?: string; children: ReactNode };

/** Gabarit des pages juridiques : sobre, lisible, daté. */
export function LegalLayout({ title, path, updatedAt, intro, children }: Props) {
  return (
    <>
      <PageHero
        kicker="Informations légales"
        title={title}
        lead={intro ? <p>{intro}</p> : undefined}
        breadcrumbs={[{ name: title, path }]}
      />
      <div className="section-tight">
        <div className="container-narrow prose">
          <p>
            <em>
              Dernière mise à jour : <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
            </em>
          </p>
          {children}
        </div>
      </div>
    </>
  );
}
