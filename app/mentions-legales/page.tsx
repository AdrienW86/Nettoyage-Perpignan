import Link from "next/link";
import { LegalLayout } from "@/components/ui/LegalLayout";
import { communesMeta } from "@/lib/communes";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Mentions légales",
  description: `Mentions légales du site ${site.name} : éditeur, directeur de la publication, hébergeur, propriété intellectuelle.`,
  path: "/mentions-legales",
});

const UPDATED = "2026-10-20";

export default function MentionsLegalesPage() {
  const { legal, contact, hosting } = site;
  return (
    <LegalLayout title="Mentions légales" path="/mentions-legales" updatedAt={UPDATED}>
      <h2>Éditeur du site</h2>
      <p>
        Le site <strong>{site.url.replace("https://", "")}</strong> est édité par :
      </p>
      <ul>
        <li>
          <strong>{legal.legalDesignation}</strong> — {legal.legalForm.toLowerCase()}
        </li>
        <li>Nom commercial enregistré : {legal.registeredTradeName}</li>
        <li>Site exploité sous la marque « {site.name} »</li>
        <li>
          Siège : {legal.address.street}, {legal.address.postalCode} {legal.address.locality}
        </li>
        <li>SIREN : {legal.siren}</li>
        <li>SIRET (siège) : {legal.siret}</li>
        <li>Immatriculation au registre national des entreprises depuis le {formatDate(legal.registeredOn)}</li>
        {legal.vatNumber ? <li>N° de TVA intracommunautaire : {legal.vatNumber}</li> : null}
        <li>
          Téléphone : <a href={`tel:${contact.phoneE164}`}>{contact.phoneDisplay}</a>
        </li>
        <li>
          E-mail : <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
      </ul>

      <h2>Directeur de la publication</h2>
      <p>{legal.publicationDirector}, en qualité d&apos;entrepreneur individuel.</p>

      <h2>Hébergement</h2>
      <p>
        {hosting.name}
        <br />
        {hosting.address}
        <br />
        <a href={hosting.website} target="_blank" rel="noopener">
          {hosting.website.replace("https://", "")}
        </a>
      </p>

      <h2>Conception et réalisation</h2>
      <p>
        <a href="https://code-v.fr" target="_blank" rel="noopener">
          Codev
        </a>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, la mise en page et les éléments graphiques propres au site sont la propriété de l&apos;éditeur.
        Toute reproduction, même partielle, sans autorisation écrite préalable est interdite.
      </p>
      <p>
        Les photographies présentes sur le site sont des <strong>visuels d&apos;illustration</strong> : elles ne
        représentent pas des interventions réalisées chez des clients.
      </p>

      <h2>Données géographiques</h2>
      <p>
        La liste des communes et leurs caractéristiques proviennent de l&apos;{communesMeta.source}, publiée sous{" "}
        <a href="https://www.etalab.gouv.fr/licence-ouverte-open-licence/" target="_blank" rel="noopener">
          Licence Ouverte
        </a>
        .
      </p>

      <h2>Données personnelles et cookies</h2>
      <p>
        Le traitement des données transmises via le formulaire de devis est décrit dans notre{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>. Le site ne dépose aucun cookie de mesure
        d&apos;audience ni de publicité.
      </p>

    </LegalLayout>
  );
}
