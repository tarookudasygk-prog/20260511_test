import { notFound } from "next/navigation";
import Link from "next/link";
import { COMPANIES, getCompany } from "@/data/companies";

export function generateStaticParams() {
  return COMPANIES.map((c) => ({ id: c.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const c = getCompany(params.id);
  if (!c) return { title: "Not Found" };
  return {
    title: `${c.name} | IP企業ストラテジー図鑑`,
    description: c.positioning,
  };
}

export default function CompanyPage({ params }: { params: { id: string } }) {
  const company = getCompany(params.id);
  if (!company) return notFound();

  const main = company.characters[0];

  return (
    <main className="mx-auto max-w-5xl px-5 pb-20 pt-8 sm:px-8">
      <nav className="mb-6 text-xs text-ink-300">
        <Link href="/" className="hover:text-gold-400">
          ← 図鑑に戻る
        </Link>
      </nav>

      <header
        className="relative overflow-hidden rounded-2xl border border-ink-600 p-6 sm:p-8"
        style={{
          background: `linear-gradient(135deg, ${company.gradient[0]}33, ${company.gradient[1]}22), #11141b`,
        }}
      >
        <div className="flex items-start justify-between text-xs text-ink-200">
          <span className="font-mono">No.{String(company.no).padStart(3, "0")}</span>
          <span className="rounded-full border border-ink-500/60 bg-ink-700/60 px-2 py-0.5">
            {company.ticker ? `${company.ticker} | ${company.listing}` : company.listing}
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div
            className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl border border-ink-500/60 text-7xl"
            style={{
              background: `linear-gradient(135deg, ${company.gradient[0]}55, ${company.gradient[1]}55)`,
            }}
          >
            {main.glyph ?? "★"}
          </div>
          <div>
            <div className="text-xs text-ink-300">{main.name}</div>
            <h1 className="mt-1 text-3xl font-bold leading-tight sm:text-4xl">
              <span className="gradient-text">{company.name}</span>
            </h1>
            <div className="mt-1 text-sm text-ink-300">{company.nameEn} ・ {company.hq}</div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-100">
              {company.positioning}
            </p>
            <div className="mt-3 flex flex-wrap gap-1">
              {company.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-ink-700/80 px-2 py-0.5 text-[10px] text-ink-200"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <Section title="代表キャラクター / IP">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {company.characters.map((c) => (
            <div
              key={c.name}
              className="rounded-xl border border-ink-600 bg-ink-800/70 p-4"
            >
              <div className="text-3xl">{c.glyph ?? "★"}</div>
              <div className="mt-2 text-sm font-semibold text-ink-100">
                {c.name}
              </div>
              {c.tagline && (
                <p className="mt-1 text-xs text-ink-300">{c.tagline}</p>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="中期経営計画" subtitle={`${company.planName} ／ ${company.planPeriod}`}>
        <div className="space-y-3">
          {company.pillars.map((p, i) => (
            <div
              key={i}
              className="rounded-xl border border-ink-600 bg-ink-800/60 p-4"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-gold-400">
                  #{String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold text-ink-100">
                  {p.title}
                </h3>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-ink-200">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="定量目標 / 開示KPI">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {company.targets.map((t, i) => (
            <div
              key={i}
              className="rounded-xl border border-ink-600 bg-ink-800/60 p-4"
            >
              <div className="text-xs text-ink-300">{t.label}</div>
              <div className="mt-1 text-lg font-semibold text-gold-400">
                {t.value}
              </div>
              {t.note && (
                <p className="mt-1 text-xs text-ink-400">{t.note}</p>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="戦略的示唆 — 実務目線の論点">
        <div className="space-y-3">
          {company.insights.map((it, i) => (
            <div
              key={i}
              className="rounded-xl border border-gold-500/30 bg-gradient-to-br from-gold-500/5 to-transparent p-4"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-gold-400">◆</span>
                <h3 className="text-base font-semibold text-ink-100">
                  {it.headline}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-100">
                {it.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="ウォッチポイント — 今後12-24か月">
        <ul className="space-y-2">
          {company.watch.map((w, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-xl border border-ink-600 bg-ink-800/40 p-3 text-sm text-ink-100"
            >
              <span className="mt-0.5 text-gold-400">→</span>
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="参照資料 (公的一次資料)">
        <div className="space-y-2">
          {company.sources.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-ink-600 bg-ink-800/50 px-4 py-3 text-sm hover:border-gold-400"
            >
              <span className="text-ink-100">{s.label}</span>
              <span className="font-mono text-xs text-ink-400 group-hover:text-gold-400">
                {s.url} ↗
              </span>
            </a>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-400">
          ※ 数値・期間は公開資料の更新によって変動する可能性があります。実務判断は必ず最新の一次資料をご確認ください。
        </p>
      </Section>

      <div className="mt-12 flex items-center justify-between border-t border-ink-700 pt-6 text-xs text-ink-300">
        <Link href="/" className="hover:text-gold-400">
          ← 図鑑トップへ
        </Link>
        <span>No.{String(company.no).padStart(3, "0")} / {COMPANIES.length}</span>
      </div>
    </main>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <div className="mb-4">
        <h2 className="text-xs font-mono uppercase tracking-widest text-gold-400">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-ink-200">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}
