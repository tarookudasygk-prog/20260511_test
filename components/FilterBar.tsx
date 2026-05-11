"use client";

import { useMemo, useState } from "react";
import type { Company } from "@/data/types";
import { CharacterCard } from "./CharacterCard";

export function FilterBar({ companies }: { companies: Company[] }) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const s = new Set<string>();
    companies.forEach((c) => c.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [companies]);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return companies.filter((c) => {
      const tagOk = !tag || c.tags.includes(tag);
      if (!ql) return tagOk;
      const hay = [
        c.name,
        c.nameEn,
        c.ticker ?? "",
        c.positioning,
        ...c.characters.map((x) => x.name),
        ...c.tags,
      ]
        .join(" ")
        .toLowerCase();
      return tagOk && hay.includes(ql);
    });
  }, [q, tag, companies]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="企業名・IP・銘柄コードで検索"
          className="w-full rounded-xl border border-ink-600 bg-ink-800/80 px-4 py-2.5 text-sm text-ink-100 placeholder:text-ink-400 focus:border-gold-400 focus:outline-none sm:w-80"
        />
        <div className="scroll-hide flex flex-1 gap-2 overflow-x-auto">
          <FilterChip active={tag === null} onClick={() => setTag(null)}>
            すべて ({companies.length})
          </FilterChip>
          {tags.map((t) => (
            <FilterChip key={t} active={tag === t} onClick={() => setTag(t)}>
              #{t}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((c) => (
          <CharacterCard key={c.id} company={c} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-ink-600 bg-ink-800/50 p-8 text-center text-ink-300">
          該当する企業が見つかりませんでした。
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition ${
        active
          ? "border-gold-400 bg-gold-500/15 text-gold-400"
          : "border-ink-600 bg-ink-800/60 text-ink-300 hover:border-ink-500 hover:text-ink-100"
      }`}
    >
      {children}
    </button>
  );
}
