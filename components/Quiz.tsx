"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, RotateCcw, Share2, ArrowRight } from "lucide-react";
import { rankForScore, type QuizQuestion } from "@/lib/quiz";
import { siteConfig } from "@/lib/site";

/**
 * Quiz interactif : une question à la fois, feedback immédiat et
 * explication sourcée. Volontairement sobre : transitions CSS courtes,
 * pas d'animation tape-à-l'oeil.
 */
export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shared, setShared] = useState(false);

  const q = questions[index];
  const answered = picked !== null;
  const isLast = index === questions.length - 1;

  function pick(i: number) {
    if (answered) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
    setShared(false);
  }

  async function share() {
    const text = `J'ai fait ${score}/${questions.length} au quiz GTA 6 de ${siteConfig.domain}. Tu fais mieux ?`;
    const url = `https://${siteConfig.domain}/quiz`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Quiz GTA 6", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch {
      /* partage annulé : rien à faire */
    }
  }

  if (finished) {
    const rank = rankForScore(score);
    return (
      <div className="rounded-3xl border border-border bg-surface p-7 text-center sm:p-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted">
          Votre résultat
        </p>
        <p className="mt-5 font-display text-6xl uppercase tracking-wide sm:text-7xl">
          <span className="text-gradient">
            {score}/{questions.length}
          </span>
        </p>
        <h2 className="mt-4 font-display text-2xl uppercase tracking-wide text-ink sm:text-3xl">
          {rank.title}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-body">{rank.text}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={restart}
            className="btn-sunset inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider text-white"
          >
            <RotateCcw className="h-4 w-4" /> Rejouer
          </button>
          <button
            type="button"
            onClick={share}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-6 py-3 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:border-vice/50"
          >
            <Share2 className="h-4 w-4" /> {shared ? "Lien copié !" : "Défier un ami"}
          </button>
        </div>
        <p className="mt-6 text-sm text-muted">
          Envie de gonfler votre score ?{" "}
          <Link href="/guides" className="font-medium text-vice-300 underline underline-offset-4">
            Révisez avec nos guides
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
      {/* Progression */}
      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.25em] text-muted">
        <span>
          Question {index + 1}/{questions.length}
        </span>
        <span className="text-sand">Score : {score}</span>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sunset to-vice transition-all duration-300"
          style={{ width: `${((index + (answered ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <h2 className="mt-7 text-xl font-extrabold leading-snug text-ink sm:text-2xl">
        {q.question}
      </h2>

      <div className="mt-6 grid gap-3">
        {q.choices.map((choice, i) => {
          const isCorrect = i === q.answer;
          const isPicked = i === picked;
          let styles = "border-border bg-surface-2 hover:border-vice/60 hover:bg-surface-2/70";
          if (answered) {
            if (isCorrect) styles = "border-emerald-400/70 bg-emerald-400/10 text-ink";
            else if (isPicked) styles = "border-red-400/70 bg-red-400/10 text-ink";
            else styles = "border-border bg-surface-2 opacity-45";
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => pick(i)}
              disabled={answered}
              className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-[15px] font-medium text-body transition-colors duration-200 disabled:cursor-default ${styles}`}
            >
              <span>{choice}</span>
              {answered && isCorrect && <Check className="h-5 w-5 shrink-0 text-emerald-400" />}
              {answered && isPicked && !isCorrect && (
                <X className="h-5 w-5 shrink-0 text-red-400" />
              )}
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
        {answered && (
          <div className="mt-5 rounded-xl border border-border bg-bg/50 p-4">
            <p className="text-sm font-bold uppercase tracking-widest">
              {picked === q.answer ? (
                <span className="text-emerald-400">Bonne réponse</span>
              ) : (
                <span className="text-red-400">Raté !</span>
              )}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-body">{q.explanation}</p>
          </div>
        )}
      </div>

      {answered && (
        <div className="mt-6 text-right">
          <button
            type="button"
            onClick={next}
            className="btn-sunset inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider text-white"
          >
            {isLast ? "Voir mon résultat" : "Question suivante"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
