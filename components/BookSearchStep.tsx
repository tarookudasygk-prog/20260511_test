"use client";

import { useState } from "react";
import type { BookMeta } from "@/lib/types";

type Props = {
  selected: BookMeta | null;
  onSelect: (book: BookMeta | null) => void;
};

const ISBN_RE = /^(?:97[89])?\d{9}[\dX]$/;

export function BookSearchStep({ selected, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BookMeta[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const clean = q.replace(/[^0-9Xx]/g, "");
      const isIsbn = ISBN_RE.test(clean.toUpperCase());
      const url = isIsbn
        ? `/api/book?isbn=${encodeURIComponent(clean)}`
        : `/api/book?q=${encodeURIComponent(q)}`;
      const res = await fetch(url);
      const data = (await res.json()) as { books?: BookMeta[]; error?: string };
      if (data.error) {
        setError(data.error);
      } else {
        setResults(data.books || []);
        if ((data.books || []).length === 0) {
          setError("該当する書籍が見つかりませんでした。別のキーワードでお試しください。");
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "通信エラー");
    } finally {
      setLoading(false);
    }
  }

  if (selected) {
    return (
      <div className="fade-in flex gap-4 rounded-xl border border-paper-300 bg-white p-4">
        <BookCover cover={selected.cover} title={selected.title} small />
        <div className="flex-1 min-w-0">
          <div className="text-xs text-ink-500">ISBN {selected.isbn}</div>
          <div className="font-semibold text-ink-900 leading-snug">{selected.title}</div>
          <div className="mt-1 text-sm text-ink-600">{selected.author}</div>
          <div className="text-xs text-ink-500">
            {selected.publisher}
            {selected.pubdate ? ` ・ ${selected.pubdate}` : ""}
          </div>
        </div>
        <button
          className="btn btn-ghost self-start whitespace-nowrap"
          onClick={() => {
            onSelect(null);
            setResults([]);
            setQuery("");
          }}
        >
          変更
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          className="field flex-1"
          placeholder="ISBN または 書名・著者名で検索（例：9784101001012 / 吾輩は猫である）"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") run();
          }}
          autoComplete="off"
          inputMode="search"
        />
        <button
          className="btn btn-primary sm:w-32"
          onClick={run}
          disabled={loading || !query.trim()}
        >
          {loading ? <span className="spinner" /> : "検索"}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-paper-300 bg-paper-100 px-3 py-2 text-sm text-ink-600">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {results.map((b) => (
            <button
              key={b.isbn}
              onClick={() => onSelect(b)}
              className="group flex gap-3 rounded-xl border border-paper-300 bg-white p-3 text-left transition hover:border-brand-400 hover:shadow-cardHover"
            >
              <BookCover cover={b.cover} title={b.title} small />
              <div className="min-w-0 flex-1">
                <div className="line-clamp-2 text-sm font-semibold text-ink-900">
                  {b.title}
                </div>
                <div className="mt-0.5 line-clamp-1 text-xs text-ink-600">
                  {b.author}
                </div>
                <div className="mt-0.5 line-clamp-1 text-[11px] text-ink-500">
                  {b.publisher}
                  {b.pubdate ? ` ・ ${b.pubdate}` : ""}
                </div>
                <div className="mt-1 text-[11px] text-ink-400">ISBN {b.isbn}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BookCover({
  cover,
  title,
  small,
}: {
  cover: string | null;
  title: string;
  small?: boolean;
}) {
  const w = small ? 48 : 80;
  const h = small ? 68 : 112;
  if (cover) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={cover}
        alt={title}
        width={w}
        height={h}
        style={{ width: w, height: h }}
        className="flex-shrink-0 rounded object-cover shadow-card"
      />
    );
  }
  return (
    <div
      style={{ width: w, height: h }}
      className="flex flex-shrink-0 items-center justify-center rounded bg-paper-200 text-[10px] text-ink-500 shadow-card"
    >
      no cover
    </div>
  );
}
