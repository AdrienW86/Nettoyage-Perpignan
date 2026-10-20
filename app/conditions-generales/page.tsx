import { LegalLayout } from "@/components/ui/LegalLayout";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Conditions générales de prestation",
  description: `Conditions générales applicables aux prestations de nettoyage, désinfection et traitement des nuisibles de ${site.name}.`,
  path: "/conditions-generales",
});

const UPDATED = "2026-10-20";

export default function ConditionsGeneralesPage() {
  const { legal } = site;
  return (
    <LegalLayout title="Conditions générales de prestation" path="/conditions-generales" updatedAt={UPDATED}>
      <h2>1. Objet et champ d&apos;application</h2>
      <p>
        Les présentes conditions régissent les prestations proposées sous la marque {site.name} par{" "}
        {legal.legalDesignation} (SIRET {legal.siret}), dont le siège est situé {legal.address.street},{" "}
        {legal.address.postalCode} {legal.address.locality}. Elles s&apos;appliquent à tout devis accepté, sauf
        conditions particulières convenues par écrit, qui prévalent alors.
      </p>

      <h2>2. Prestations</h2>
      <p>
        Les prestations comprennent notamment le nettoyage de logements et de locaux professionnels, la désinfection,
        le traitement des nuisibles, le nettoyage de logements encombrés et le nettoyage après décès. Le contenu exact
        de chaque intervention est décrit dans le devis.
      </p>

      <h2>3. Devis et commande</h2>
      <p>
        Le devis est gratuit. Il précise la nature des prestations, leur prix et sa durée de validité. La commande est
        formée par l&apos;acceptation écrite du devis par le client (signature, ou accord par e-mail). Toute prestation
        supplémentaire demandée en cours d&apos;intervention fait l&apos;objet d&apos;un accord préalable.
      </p>

      <h2>4. Prix et paiement</h2>
      <p>
        Les prix sont ceux indiqués sur le devis accepté. Le paiement peut être effectué par virement, carte bancaire
        ou espèces dans la limite autorisée par la loi, selon les modalités précisées sur le devis. Un acompte peut
        être demandé pour certaines prestations ; il est alors mentionné sur le devis.
      </p>

      <h2>5. Droit de rétractation (clients consommateurs)</h2>
      <p>
        Lorsque le contrat est conclu à distance ou hors établissement avec un consommateur, celui-ci dispose
        d&apos;un délai de quatorze jours à compter de la conclusion du contrat pour se rétracter, sans avoir à
        justifier de motif, conformément au Code de la consommation. Si le client demande expressément que la
        prestation commence avant la fin de ce délai, il reste redevable du montant correspondant au service fourni
        jusqu&apos;à la communication de sa décision de se rétracter ; il perd son droit de rétractation lorsque la
        prestation a été pleinement exécutée avec son accord préalable.
      </p>

      <h2>6. Annulation et report</h2>
      <p>
        Le client peut annuler ou reporter une intervention en prévenant au moins 24 heures à l&apos;avance. En deçà,
        des frais de déplacement peuvent être facturés s&apos;ils sont prévus au devis, sans préjudice du droit de
        rétractation prévu à l&apos;article 5.
      </p>

      <h2>7. Obligations du client</h2>
      <p>Pour permettre le bon déroulement de l&apos;intervention, le client :</p>
      <ul>
        <li>assure l&apos;accès aux lieux aux date et heure convenues ;</li>
        <li>met à disposition l&apos;eau et l&apos;électricité nécessaires ;</li>
        <li>signale les surfaces, objets ou matériaux fragiles ou de valeur ;</li>
        <li>informe de tout risque particulier (présence d&apos;animaux, de personnes fragiles, de produits dangereux).</li>
      </ul>

      <h2>8. Exécution et réserves</h2>
      <p>
        Les prestations sont réalisées avec soin, selon les règles de l&apos;art et avec des produits adaptés. Certaines
        salissures ou dégradations anciennes peuvent ne pas disparaître totalement malgré un traitement approprié ;
        l&apos;intervenant en informe le client dès qu&apos;il le constate. Toute réclamation doit être formulée dans
        les meilleurs délais après l&apos;intervention, de préférence par écrit.
      </p>

      <h2>9. Responsabilité</h2>
      <p>
        L&apos;entrepreneur est responsable des dommages directement causés lors de l&apos;exécution des prestations,
        dans les conditions du droit commun. Sa responsabilité ne saurait être engagée pour les dommages résultant
        d&apos;un défaut d&apos;information du client, de l&apos;état préexistant des lieux ou d&apos;un cas de force
        majeure.
      </p>

      <h2>10. Litiges</h2>
      <p>
        En cas de difficulté, le client est invité à contacter l&apos;entrepreneur afin de rechercher une solution
        amiable. À défaut, le litige est porté devant la juridiction compétente selon les règles de droit commun ;
        pour les clients professionnels, compétence est attribuée aux juridictions du ressort du siège de
        l&apos;entrepreneur. Le droit français est applicable.
      </p>
    </LegalLayout>
  );
}
