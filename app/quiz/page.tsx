import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Quiz } from "@/components/Quiz";
import { quizQuestions } from "@/lib/quiz";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Quiz GTA 6 : êtes-vous un vrai fan ? (12 questions)",
  description:
    "Testez vos connaissances sur GTA 6 : date de sortie, Leonida, Jason et Lucia, éditions, trailers. 12 questions vérifiées, résultat immédiat et explications.",
  path: "/quiz",
  keywords: ["quiz gta 6", "test gta 6", "questions gta 6", "quiz gta6 francais"],
});

export default function QuizPage() {
  return (
    <Container className="py-10">
      <div className="mx-auto max-w-2xl">
        <Breadcrumbs items={[{ name: "Quiz GTA 6", path: "/quiz" }]} />

        <header className="mb-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-sunset-300">
            Par des fans, pour des fans
          </p>
          <h1 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-wide sm:text-5xl">
            <span className="text-gradient">Quiz GTA 6</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-[16px] leading-7 text-body">
            12 questions, uniquement des faits confirmés par Rockstar. Une bonne réponse ?
            On vous explique pourquoi. Prêt à défendre votre statut de vrai fan ?
          </p>
        </header>

        <Quiz questions={quizQuestions} />

        <p className="mt-8 text-center text-sm text-muted">
          Toutes les réponses sont tirées du matériel officiel. Pour aller plus loin,
          explorez{" "}
          <Link href="/guides" className="font-medium text-vice-300 underline underline-offset-4">
            nos guides
          </Link>{" "}
          et{" "}
          <Link href="/carte" className="font-medium text-vice-300 underline underline-offset-4">
            la carte de Leonida
          </Link>
          .
        </p>
      </div>
    </Container>
  );
}
