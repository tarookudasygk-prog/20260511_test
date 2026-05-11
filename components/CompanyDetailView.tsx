"use client";

import Link from "next/link";
import { useState } from "react";
import type { Company } from "@/data/types";
import { DetailModal, useDetailModal } from "./DetailModal";

export function CompanyDetailView({
  company,
  total,
}: {
  company: Company;
  total: number;
}) {
  const modal = useDetailModal();
  const main = company.characters[0];
  const [imgErr, setImgErr] = useState<Record<number, boolean>>({});

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
            {company.ticker
              ? `${company.ticker} | ${company.listing}`
              : company.listing}
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div
            className="relative flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-ink-500/60"
            style={{
              background: `linear-gradient(135deg, ${company.gradient[0]}55, ${company.gradient[1]}55)`,
            }}
          >
            {main.imageUrl && !imgErr[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={main.imageUrl}
                alt={main.name}
                loading="lazy"
                onError={() => setImgErr((s) => ({ ...s, 0: true }))}
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <div className="text-7xl">{main.glyph ?? "★"}</div>
            )}
          </div>
          <div className="flex-1">
            <div className="text-xs text-ink-300">{main.name}</div>
            <h1 className="mt-1 text-3xl font-bold leading-tight sm:text-4xl">
              <span className="gradient-text">{company.name}</span>
            </h1>
            <div className="mt-1 text-sm text-ink-300">
              {company.nameEn} ・ {company.hq}
            </div>
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
          {company.logoUrl && (
            <div className="hidden h-16 w-32 shrink-0 items-center justify-center rounded-lg bg-white/90 p-2 sm:flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={company.logoUrl}
                alt={`${company.name} logo`}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}
        </div>
      </header>

      <Section title="代表キャラクター / IP">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {company.characters.map((c, i) => (
            <div
              key={c.name}
              className="overflow-hidden rounded-xl border border-ink-600 bg-ink-800/70"
            >
              <div
                className="flex h-32 items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${company.gradient[0]}33, ${company.gradient[1]}22)`,
                }}
              >
                {c.imageUrl && !imgErr[100 + i] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.imageUrl}
                    alt={c.name}
                    loading="lazy"
                    onError={() =>
                      setImgErr((s) => ({ ...s, [100 + i]: true }))
                    }
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <div className="text-5xl">{c.glyph ?? "★"}</div>
                )}
              </div>
              <div className="p-3">
                <div className="text-sm font-semibold text-ink-100">
                  {c.name}
                </div>
                {c.tagline && (
                  <p className="mt-1 text-xs text-ink-300">{c.tagline}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="中期経営計画"
        subtitle={`${company.planName} ／ ${company.planPeriod}`}
        hint="クリックで詳細"
      >
        <div className="space-y-3">
          {company.pillars.map((p, i) => (
            <button
              key={i}
              onClick={() =>
                modal.open({
                  kind: "pillar",
                  title: p.title,
                  body: p.detail,
                  subtitle: `${company.name} ／ 戦略の柱 #${String(i + 1).padStart(2, "0")}`,
                })
              }
              className="card-hover w-full rounded-xl border border-ink-600 bg-ink-800/60 p-4 text-left"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-gold-400">
                  #{String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold text-ink-100">
                  {p.title}
                </h3>
              </div>
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-200">
                {p.detail}
              </p>
              <div className="mt-2 text-[10px] font-mono text-ink-400">
                詳細を見る ▸
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Section title="定量目標 / 開示KPI" hint="クリックで詳細">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {company.targets.map((t, i) => (
            <button
              key={i}
              onClick={() =>
                modal.open({
                  kind: "target",
                  title: t.label,
                  subtitle: company.name,
                  body: t.value,
                  note: t.note,
                })
              }
              className="card-hover rounded-xl border border-ink-600 bg-ink-800/60 p-4 text-left"
            >
              <div className="text-xs text-ink-300">{t.label}</div>
              <div className="mt-1 text-lg font-semibold text-gold-400">
                {t.value}
              </div>
              {t.note && (
                <p className="mt-1 line-clamp-2 text-xs text-ink-400">{t.note}</p>
              )}
            </button>
          ))}
        </div>
      </Section>

      <Section
        title="戦略的示唆 — 実務目線の論点"
        hint="クリックで詳細を表示"
      >
        <div className="space-y-3">
          {company.insights.map((it, i) => (
            <button
              key={i}
              onClick={() =>
                modal.open({
                  kind: "insight",
                  title: it.headline,
                  subtitle: `${company.name} ／ 戦略的示唆 #${String(i + 1).padStart(2, "0")}`,
                  body: it.body,
                  detail: it.detail,
                })
              }
              className="card-hover w-full rounded-xl border border-gold-500/30 bg-gradient-to-br from-gold-500/5 to-transparent p-4 text-left"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-gold-400">◆</span>
                <h3 className="text-base font-semibold text-ink-100">
                  {it.headline}
                </h3>
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-100">
                {it.body}
              </p>
              <div className="mt-2 text-[10px] font-mono text-gold-400/70">
                背景・含意を読む ▸
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Section
        title="ウォッチポイント — 今後12-24か月"
        hint="クリックで詳細を表示"
      >
        <ul className="space-y-2">
          {company.watch.map((w, i) => (
            <li key={i}>
              <button
                onClick={() =>
                  modal.open({
                    kind: "watch",
                    title: w.item,
                    subtitle: `${company.name} ／ ウォッチポイント #${String(i + 1).padStart(2, "0")}`,
                    detail: w.detail,
                  })
                }
                className="card-hover flex w-full items-start gap-2 rounded-xl border border-ink-600 bg-ink-800/40 p-3 text-left text-sm text-ink-100"
              >
                <span className="mt-0.5 text-emerald-400">→</span>
                <span className="flex-1">{w.item}</span>
                <span className="text-[10px] font-mono text-ink-400">
                  詳細 ▸
                </span>
              </button>
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
        <span>
          No.{String(company.no).padStart(3, "0")} / {total}
        </span>
      </div>

      <DetailModal
        open={!!modal.state}
        onClose={modal.close}
        kind={modal.state?.kind ?? "insight"}
        title={modal.state?.title ?? ""}
        subtitle={modal.state?.subtitle}
        body={modal.state?.body}
        detail={modal.state?.detail}
        note={modal.state?.note}
      />
    </main>
  );
}

function Section({
  title,
  subtitle,
  hint,
  children,
}: {
  title: string;
  subtitle?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h2 className="text-xs font-mono uppercase tracking-widest text-gold-400">
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-sm text-ink-200">{subtitle}</p>}
        </div>
        {hint && (
          <span className="text-[10px] font-mono text-ink-400">{hint}</span>
        )}
      </div>
      {children}
    </section>
  );
}
