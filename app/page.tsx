import { COMPANIES } from "@/data/companies";
import { FilterBar } from "@/components/FilterBar";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8">
      <header className="mb-10 border-b border-ink-700 pb-8">
        <div className="flex items-baseline gap-3 text-xs font-mono text-ink-300">
          <span>STRATEGIC IP CODEX</span>
          <span className="text-ink-500">/</span>
          <span>v1.0</span>
        </div>
        <h1 className="mt-2 text-4xl font-bold leading-tight sm:text-5xl">
          <span className="gradient-text">IP企業ストラテジー図鑑</span>
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-200 sm:text-base">
          代表IPキャラクターを入口に、各社が公開している
          <span className="text-gold-400">中期経営計画 / 統合報告書 / 適時開示</span>
          から読み解ける戦略示唆を実務向けに整理した図鑑です。
          『公的な一次資料に裏付けされた情報』のみを掲載し、
          推測値は含めていません。各社末尾の参照リンクから最新の原資料を確認してください。
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-[11px] text-ink-300">
          <span className="rounded-full border border-ink-600 px-2 py-0.5">
            掲載 {COMPANIES.length} 社
          </span>
          <span className="rounded-full border border-ink-600 px-2 py-0.5">
            出典：各社 公開IR資料・適時開示
          </span>
          <span className="rounded-full border border-ink-600 px-2 py-0.5">
            最終データ収集：2025-11 時点公開資料
          </span>
        </div>
      </header>

      <FilterBar companies={COMPANIES} />

      <footer className="mt-16 border-t border-ink-700 pt-6 text-xs text-ink-400">
        <p>
          本サイトは公開IR資料の整理・要約を目的とした非公式コンテンツです。投資判断は必ず一次資料 (有価証券報告書、決算短信、適時開示) をご確認ください。
        </p>
        <p className="mt-1">
          数値は各企業の公開資料時点のものであり、最新値とは異なる可能性があります。
        </p>
      </footer>
    </main>
  );
}
