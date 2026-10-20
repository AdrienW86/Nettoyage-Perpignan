import { LegalLayout } from "@/components/ui/LegalLayout";
import { RATE_LIMIT } from "@/lib/rate-limit";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Politique de confidentialité",
  description: `Comment ${site.name} traite les données personnelles transmises via le formulaire de devis : finalités, durées de conservation, droits.`,
  path: "/confidentialite",
});

const UPDATED = "2026-10-20";

export default function ConfidentialitePage() {
  const { legal, contact, hosting } = site;
  const turnstile = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  return (
    <LegalLayout
      title="Politique de confidentialité"
      path="/confidentialite"
      updatedAt={UPDATED}
      intro="Nous collectons uniquement les informations nécessaires pour répondre à votre demande. Voici lesquelles, pourquoi, et quels sont vos droits."
    >
      <h2>Responsable du traitement</h2>
      <p>
        {legal.legalDesignation}, {legal.address.street}, {legal.address.postalCode} {legal.address.locality} —{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>

      <h2>Données collectées</h2>
      <h3>Formulaire de demande de devis</h3>
      <ul>
        <li>type d&apos;intervention souhaitée et commune d&apos;intervention ;</li>
        <li>nom et prénom, numéro de téléphone, adresse e-mail ;</li>
        <li>description libre de votre besoin.</li>
      </ul>
      <p>
        Dans le champ libre, merci de ne transmettre que les informations utiles à l&apos;établissement du devis. Il
        n&apos;est pas nécessaire d&apos;y indiquer des informations relatives à la santé d&apos;une personne.
      </p>
      <h3>Données techniques</h3>
      <p>
        Pour protéger le formulaire contre les envois abusifs, l&apos;adresse IP de l&apos;expéditeur est transformée
        en empreinte non réversible (hachage) et conservée au maximum {RATE_LIMIT.windowSeconds / 3600} heure.
        L&apos;hébergeur conserve par ailleurs des journaux techniques nécessaires à la sécurité du service.
      </p>

      <h2>Finalités et bases légales</h2>
      <ul>
        <li>
          <strong>Répondre à votre demande et établir un devis</strong> : mesures précontractuelles prises à votre
          demande (article 6.1.b du RGPD).
        </li>
        <li>
          <strong>Exécuter la prestation</strong> si vous acceptez le devis : exécution du contrat (article 6.1.b).
        </li>
        <li>
          <strong>Sécuriser le site et le formulaire</strong> : intérêt légitime de l&apos;éditeur (article 6.1.f).
        </li>
      </ul>
      <p>Vos données ne sont ni vendues, ni louées, ni utilisées pour de la prospection commerciale par des tiers.</p>

      <h2>Destinataires</h2>
      <p>
        Les données sont destinées à l&apos;entrepreneur, seul habilité à traiter les demandes. Elles transitent par
        des prestataires techniques agissant pour son compte : l&apos;hébergeur du site ({hosting.name}) et le
        fournisseur de messagerie électronique
        {turnstile ? ", ainsi que Cloudflare pour la vérification anti-robot du formulaire (Turnstile)" : ""}.
      </p>
      <p>
        Certains de ces prestataires pouvant être établis hors de l&apos;Union européenne, notamment aux
        États-Unis, les transferts de données éventuels sont encadrés par les garanties prévues par le RGPD (décision
        d&apos;adéquation ou clauses contractuelles types de la Commission européenne).
      </p>

      <h2>Durées de conservation</h2>
      <ul>
        <li>
          Demande de devis non suivie de prestation : <strong>3 ans</strong> à compter du dernier contact de votre
          part.
        </li>
        <li>
          Client : durée de la relation commerciale, puis durée des obligations légales (les pièces comptables sont
          conservées 10 ans).
        </li>
        <li>Empreinte d&apos;adresse IP (anti-abus) : {RATE_LIMIT.windowSeconds / 3600} heure au maximum.</li>
      </ul>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation et
        d&apos;opposition au traitement de vos données, ainsi que d&apos;un droit à la portabilité lorsque le
        traitement repose sur un contrat. Pour les exercer, écrivez à{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>. Une réponse vous sera apportée dans un délai
        d&apos;un mois.
      </p>
      <p>
        Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la{" "}
        <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener">
          CNIL
        </a>
        .
      </p>

      <h2>Cookies</h2>
      <p>
        Le site ne dépose aucun cookie de mesure d&apos;audience, de publicité ou de réseau social. Aucun bandeau de
        consentement n&apos;est donc nécessaire. Si un outil de mesure soumis au consentement venait à être ajouté,
        cette politique serait mise à jour et votre accord serait recueilli au préalable.
      </p>
    </LegalLayout>
  );
}
