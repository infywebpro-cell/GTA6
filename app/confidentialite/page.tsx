import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialite",
  description: "Politique de confidentialite et gestion des cookies du site Guide GTA 6.",
  path: "/confidentialite",
  noindex: true,
});

export default function ConfidentialitePage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: "Confidentialite", path: "/confidentialite" }]} />
        <PageHeader kicker="Vos données" title="" gradientWord="Confidentialite" />
        <div className="prose-gta">
          <p>
            Cette page explique comment {siteConfig.name} traite les donnees des
            visiteurs. Modele a adapter a votre situation avec un conseil
            juridique si necessaire.
          </p>

          <h2>Cookies et publicite</h2>
          <p>
            Ce site affiche de la publicite via <strong>Google AdSense</strong>.
            Google et ses partenaires peuvent utiliser des cookies pour diffuser
            des annonces basees sur vos visites sur ce site et d'autres sites.
            Vous pouvez gerer vos préférences via les{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">
              parametres des annonces Google
            </a>
            .
          </p>

          <h2>Liens d'affiliation Amazon</h2>
          <p>
            {siteConfig.name} participe au Programme Partenaires d'Amazon, un
            programme d'affiliation concu pour permettre a des sites de percevoir
            une remuneration grace a la creation de liens vers Amazon.fr. Ces
            liens n'ont aucune incidence sur le prix que vous payez.
          </p>

          <h2>Mesure d'audience</h2>
          <p>
            Le site peut utiliser un outil de mesure d'audience pour comprendre la
            frequentation (pages vues, sources de trafic) de maniere agregee.
          </p>

          <h2>Vos droits (RGPD)</h2>
          <p>
            Conformement au RGPD, vous disposez d'un droit d'accès, de
            rectification et de suppression des données vous concernant. Pour
            l'exercer, contactez-nous via la page{" "}
            <a href="/contact">Contact</a>.
          </p>

          <h2>Consentement</h2>
          <p>
            En poursuivant votre navigation, vous acceptez l'utilisation des
            cookies decrits ci-dessus. Un outil de gestion du consentement
            (CMP) devra être mis en place avant l'activation des publicites
            personnalisees pour les visiteurs de l'Union europeenne.
          </p>
        </div>
      </div>
    </Container>
  );
}
