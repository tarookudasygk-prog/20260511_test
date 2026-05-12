"use client";

import { useState } from "react";
import { BookSearchStep } from "@/components/BookSearchStep";
import { LibrarySelectStep } from "@/components/LibrarySelectStep";
import { ResultStep } from "@/components/ResultStep";
import { Stepper } from "@/components/Stepper";
import type { BookMeta } from "@/lib/types";

export default function Home() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [book, setBook] = useState<BookMeta | null>(null);
  const [systemIds, setSystemIds] = useState<string[]>([]);

  const bookDone = !!book;
  const libDone = systemIds.length > 0;

  function reset() {
    setBook(null);
    setSystemIds([]);
    setStep(1);
  }

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-8 sm:px-6">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-ink-500">
          <span className="inline-block h-2 w-2 rounded-full bg-brand-500" />
          <span>Library Finder</span>
          <span className="text-paper-300">/</span>
          <span>powered by Calil API</span>
        </div>
        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl">
          <span className="brand-text">図書館蔵書ファインダー</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-700 sm:text-base">
          読みたい本が、いまお住まいの地域の図書館で
          <strong className="font-semibold">借りられるか</strong>を、
          全国 7,000 以上の図書館を横断するカーリル蔵書検索 API でひと目に確認できます。
        </p>
      </header>

      <div className="mb-6">
        <Stepper
          current={step}
          bookDone={bookDone}
          libDone={libDone}
          onJump={setStep}
        />
      </div>

      {step === 1 && (
        <Section
          n={1}
          title="探したい本を選ぶ"
          hint="ISBN コードなら一発で特定できます。書名や著者名でも検索可能です。"
        >
          <BookSearchStep
            selected={book}
            onSelect={(b) => {
              setBook(b);
              if (b) setStep(2);
            }}
          />
          {book && (
            <div className="mt-4 flex justify-end">
              <button className="btn btn-primary" onClick={() => setStep(2)}>
                次へ：図書館を選ぶ →
              </button>
            </div>
          )}
        </Section>
      )}

      {step === 2 && (
        <Section
          n={2}
          title="調べたい図書館を選ぶ"
          hint="都道府県（必須）と市区町村を指定。最大 5 つの図書館システムを同時にチェックできます。"
        >
          <LibrarySelectStep
            selectedSystemIds={systemIds}
            onChange={setSystemIds}
          />
          <div className="mt-5 flex flex-wrap justify-between gap-2">
            <button className="btn btn-ghost" onClick={() => setStep(1)}>
              ← 書籍を変える
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setStep(3)}
              disabled={systemIds.length === 0}
            >
              蔵書状況を確認する →
            </button>
          </div>
        </Section>
      )}

      {step === 3 && book && systemIds.length > 0 && (
        <Section
          n={3}
          title="蔵書状況"
          hint="各図書館の OPAC をリアルタイムに問い合わせ、最新の貸出状況を表示します。"
        >
          <ResultStep
            book={book}
            systemIds={systemIds}
            onReset={reset}
          />
        </Section>
      )}

      <footer className="mt-16 border-t border-paper-300 pt-6 text-xs leading-relaxed text-ink-500">
        <p>
          本サービスは{" "}
          <a
            href="https://calil.jp/doc/api.html"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-dotted hover:text-brand-500"
          >
            カーリル 図書館API
          </a>{" "}
          および{" "}
          <a
            href="https://openbd.jp/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-dotted hover:text-brand-500"
          >
            openBD
          </a>{" "}
          ・ Google Books API を利用しています。表示中のデータは各サービス提供者に帰属します。
        </p>
        <p className="mt-1">
          蔵書ステータスは API から取得した時点のスナップショットです。実際の貸出状況は各図書館の公式 OPAC をご確認ください。
        </p>
      </footer>
    </main>
  );
}

function Section({
  n,
  title,
  hint,
  children,
}: {
  n: number;
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <section className="fade-in rounded-2xl border border-paper-300 bg-paper-50/60 p-5 shadow-card backdrop-blur sm:p-7">
      <div className="mb-4 flex items-start gap-3">
        <span className="step-num mt-0.5">{n}</span>
        <div>
          <h2 className="font-serif text-xl font-bold text-ink-900">{title}</h2>
          <p className="mt-1 text-xs text-ink-500 sm:text-sm">{hint}</p>
        </div>
      </div>
      <div className="mt-2">{children}</div>
    </section>
  );
}
