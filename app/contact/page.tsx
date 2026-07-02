import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Contactez l'equipe de Guide GTA 6.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-2xl">
        <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
        <PageHeader
          kicker="Une question, une correction ?"
          title=""
          gradientWord="Contact"
        />
        <div className="prose-gta">
          <p>
            Une question, une correction a proposer, un partenariat ? Ecrivez-nous.
            Nous lisons tous les messages et corrigeons rapidement toute
            information inexacte.
          </p>
        </div>
        <a
          href={`mailto:contact@${siteConfig.domain}`}
          className="btn-sunset mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-widest text-bg"
        >
          <Mail className="h-5 w-5" /> contact@{siteConfig.domain}
        </a>
        <p className="mt-4 text-sm text-muted">
          Adresse a configurer une fois le domaine et la boite mail en place.
        </p>
      </div>
    </Container>
  );
}
