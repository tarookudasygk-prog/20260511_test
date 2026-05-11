import Link from "next/link";
import type { Company } from "@/data/types";

export function CharacterCard({ company }: { company: Company }) {
  const main = company.characters[0];
  return (
    <Link
      href={`/companies/${company.id}`}
      className="card-hover group relative block overflow-hidden rounded-2xl border border-ink-600/70 bg-ink-800/70 p-5 backdrop-blur"
      style={{
        backgroundImage: `radial-gradient(circle at 30% 0%, ${company.gradient[0]}33, transparent 60%), radial-gradient(circle at 100% 100%, ${company.gradient[1]}22, transparent 60%)`,
      }}
    >
      <div className="flex items-start justify-between text-xs text-ink-300">
        <span className="font-mono">No.{String(company.no).padStart(3, "0")}</span>
        <span className="rounded-full border border-ink-500/60 bg-ink-700/60 px-2 py-0.5">
          {company.ticker ?? "非上場"}
        </span>
      </div>

      <div
        className="mt-3 flex h-32 items-center justify-center rounded-xl border border-ink-600/60"
        style={{
          background: `linear-gradient(135deg, ${company.gradient[0]}55, ${company.gradient[1]}55)`,
        }}
      >
        <div className="text-6xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          {main.glyph ?? "★"}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm text-ink-300">{main.name}</div>
        <div className="mt-1 text-base font-semibold text-ink-100 group-hover:gradient-text">
          {company.name}
        </div>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-300">
          {company.positioning}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {company.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-full bg-ink-700/80 px-2 py-0.5 text-[10px] text-ink-200"
          >
            #{t}
          </span>
        ))}
      </div>
    </Link>
  );
}
