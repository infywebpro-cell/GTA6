import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Mentions legales",
  description: "Mentions legales du site Guide GTA 6.",
  path: "/mentions-legales",
  noindex: true,
});

export default function MentionsLegalesPage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: "Mentions legales", path: "/mentions-legales" }]} />
        <PageHeader kicker="Informations" title="Mentions" gradientWord="legales" />
        <div className="prose-gta">
          <h2>Editeur du site</h2>
          <p>
            {siteConfig.name} ({siteConfig.domain})<br />
            Editeur : <em>[A completer : nom / raison sociale]</em>
            <br />
            Contact : <em>[A completer : adresse e-mail]</em>
          </p>
          <h2>Hebergement</h2>
          <p>
            Site heberge par <em>[A completer : nom de l'hebergeur, ex. Vercel Inc.]</em>.
          </p>
          <h2>Propriete intellectuelle</h2>
          <p>
            « Grand Theft Auto », « GTA » et l'ensemble des marques, logos et
            visuels associes sont la propriete de Rockstar Games et de Take-Two
            Interactive. {siteConfig.name} est un site de fans independant, sans
            lien officiel avec ces societes. Les contenus redactionnels du site
            (textes, guides) sont la propriete de l'editeur.
          </p>
          <h2>Responsabilite</h2>
          <p>
            Les informations relatives a GTA 6 sont fournies a titre indicatif et
            peuvent evoluer. Avant la sortie du jeu, une partie des contenus
            repose sur des annonces officielles, des bandes-annonces et, le cas
            echeant, des informations rapportees clairement signalees.
          </p>
        </div>
      </div>
    </Container>
  );
}
