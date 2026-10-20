import { TrackedLink } from "@/components/analytics/TrackedLink";
import { QuoteSection } from "@/components/forms/QuoteSection";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { buildMetadata } from "@/lib/seo";
import { mailHref, site, telHref } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact et devis gratuit",
  description:
    "Demandez un devis gratuit pour un nettoyage, une désinfection, un traitement de nuisibles ou une intervention délicate à Perpignan et dans les Pyrénées-Orientales.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Parlons de votre besoin"
        lead={
          <p>
            Par téléphone, par e-mail ou via le formulaire ci-dessous : nous vous répondons pour comprendre votre
            situation et établir un devis gratuit.
          </p>
        }
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
      >
        <TrackedLink href={telHref} event="phone_click" location="hero-contact" className="btn">
          <Icon name="phone" /> {site.contact.phoneDisplay}
        </TrackedLink>
        <TrackedLink href={mailHref} event="email_click" location="hero-contact" className="btn btn-ghost">
          <Icon name="mail" /> {site.contact.email}
        </TrackedLink>
      </PageHero>
      <QuoteSection location="form-contact" />
    </>
  );
}
