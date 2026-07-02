import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "A propos",
  description:
    "Qui sommes-nous ? Guide GTA 6 est un site de fans francais dedie a Grand Theft Auto VI : guides, soluces, carte et vehicules.",
  path: "/a-propos",
});

export default function AProposPage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: "A propos", path: "/a-propos" }]} />
        <PageHeader
          kicker="Le site"
          title="A"
          gradientWord="propos"
          lede={`${siteConfig.name}, la reference francophone independante sur Grand Theft Auto VI.`}
        />
        <div className="prose-gta">
          <p>
            {siteConfig.name} est un site independant, tenu par des passionnes de
            la serie Grand Theft Auto. Notre objectif : devenir la reference
            francophone sur <strong>GTA 6</strong>, du compte a rebours jusqu'a la
            sortie le 19 novembre 2026, puis bien au-dela avec des soluces et des
            guides complets.
          </p>
          <h2>Notre ligne editoriale</h2>
          <p>
            Nous distinguons toujours les <strong>informations officielles</strong>{" "}
            (annoncees par Rockstar Games) des rumeurs et fuites. Quand une
            information n'est pas confirmee, nous l'indiquons clairement. Notre
            promesse : pas de fausses dates, pas de fausses caracteristiques.
          </p>
          <h2>Ce que vous trouverez ici</h2>
          <ul>
            <li>L'actualite verifiee de GTA 6 (date de sortie, precommandes, trailers) ;</li>
            <li>Une carte interactive de l'Etat de Leonida ;</li>
            <li>Une base de vehicules apercus dans le jeu ;</li>
            <li>Des guides debutant, des astuces et, des le lancement, des soluces.</li>
          </ul>
          <h2>Independance</h2>
          <p>
            Ce site n'est pas affilie a Rockstar Games ni a Take-Two Interactive.
            Il est finance par la publicite et par des liens d'affiliation
            (notamment Amazon) qui n'ont aucune incidence sur le prix que vous
            payez.
          </p>
        </div>
      </div>
    </Container>
  );
}
