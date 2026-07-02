import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[65vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-[8rem] uppercase leading-none tracking-wide sm:text-[12rem]">
        <span className="text-gradient">404</span>
      </p>
      <h1 className="mt-2 font-display text-3xl uppercase tracking-wide text-ink">
        Wasted
      </h1>
      <p className="mt-3 max-w-md text-muted">
        Cette page n'existe pas (ou plus). Retournez a l'accueil ou explorez la
        carte de Leonida.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="btn-sunset rounded-full px-6 py-3 text-sm font-bold uppercase tracking-widest text-bg"
        >
          Accueil
        </Link>
        <Link
          href="/carte"
          className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-bold uppercase tracking-widest text-ink transition-colors hover:border-vice"
        >
          La carte
        </Link>
      </div>
    </Container>
  );
}
