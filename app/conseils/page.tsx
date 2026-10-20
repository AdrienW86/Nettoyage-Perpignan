import { Reveal } from "@/components/motion/Reveal";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { getAllArticles } from "@/lib/articles";
import { buildMetadata } from "@/lib/seo";
import type { Article } from "@/types/content";
import styles from "./conseils.module.css";

export const metadata = buildMetadata({
  title: "Conseils et guides : nettoyage, désinfection, situations délicates",
  description:
    "Guides pratiques pour les particuliers et les professionnels : nettoyage après décès, syndrome de Diogène, désinfection, Certibiocide, entretien de bureaux.",
  path: "/conseils",
});

const CATEGORY_ORDER: Article["category"][] = [
  "Interventions délicates",
  "Hygiène & désinfection",
  "Réglementation",
  "Particuliers",
  "Professionnels",
];

export default function ConseilsPage() {
  const articles = getAllArticles();
  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    items: articles.filter((a) => a.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <PageHero
        kicker="Conseils"
        title="Guides pratiques, pour comprendre avant d'agir"
        lead={
          <p>
            Des réponses précises aux questions que l&apos;on se pose face à un logement à remettre en état, à une
            situation difficile ou à l&apos;entretien de locaux professionnels.
          </p>
        }
        breadcrumbs={[{ name: "Conseils", path: "/conseils" }]}
      />

      <div className="section">
        <div className="container">
          {groups.map((group) => (
            <section key={group.category} className={styles.group} aria-labelledby={`cat-${group.category}`}>
              <h2 id={`cat-${group.category}`} className={styles.groupTitle}>
                {group.category}
              </h2>
              <div className={styles.grid}>
                {group.items.map((article, i) => (
                  <Reveal key={article.slug} delay={i * 0.06}>
                    <ArticleCard article={article} />
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <CtaBand
        title="Une situation particulière ?"
        text="Nos guides ne remplacent pas un échange. Décrivez-nous votre situation : nous vous répondons simplement."
        location="band-conseils"
      />
    </>
  );
}
