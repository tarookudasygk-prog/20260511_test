"use client";

import { useEffect, useState } from "react";

export type DetailModalProps = {
  open: boolean;
  onClose: () => void;
  kind: "insight" | "watch" | "pillar" | "target";
  title: string;
  subtitle?: string;
  body?: string;
  detail?: string;
  note?: string;
};

const KIND_LABEL: Record<DetailModalProps["kind"], string> = {
  insight: "戦略的示唆",
  watch: "ウォッチポイント",
  pillar: "戦略の柱",
  target: "定量目標 / 開示KPI",
};

const KIND_ACCENT: Record<DetailModalProps["kind"], string> = {
  insight: "from-gold-500/20 to-transparent border-gold-500/40",
  watch: "from-emerald-500/20 to-transparent border-emerald-500/40",
  pillar: "from-sky-500/20 to-transparent border-sky-500/40",
  target: "from-fuchsia-500/20 to-transparent border-fuchsia-500/40",
};

export function DetailModal(props: DetailModalProps) {
  useEffect(() => {
    if (!props.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [props.open, props]);

  if (!props.open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={props.onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur" />
      <div
        className={`relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border bg-gradient-to-br ${KIND_ACCENT[props.kind]} bg-ink-800 p-6 shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink-300">
              {KIND_LABEL[props.kind]}
            </div>
            <h2 className="mt-1 text-xl font-bold text-ink-100 sm:text-2xl">
              {props.title}
            </h2>
            {props.subtitle && (
              <p className="mt-1 text-sm text-ink-200">{props.subtitle}</p>
            )}
          </div>
          <button
            onClick={props.onClose}
            aria-label="閉じる"
            className="rounded-full border border-ink-600 bg-ink-700 px-3 py-1 text-sm text-ink-200 hover:border-gold-400 hover:text-gold-400"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-100">
          {props.body && (
            <section>
              <h3 className="mb-1 text-[11px] font-mono uppercase tracking-widest text-ink-300">
                Summary
              </h3>
              <p>{props.body}</p>
            </section>
          )}
          {props.detail && (
            <section>
              <h3 className="mb-1 text-[11px] font-mono uppercase tracking-widest text-ink-300">
                Detail — 背景・なぜ重要か・実務的含意
              </h3>
              <p className="whitespace-pre-line">{props.detail}</p>
            </section>
          )}
          {!props.detail && !props.body && (
            <p className="text-ink-300">詳細情報は未整備です。</p>
          )}
          {props.note && (
            <p className="rounded-lg border border-ink-600 bg-ink-700/50 p-3 text-xs text-ink-300">
              {props.note}
            </p>
          )}
        </div>

        <div className="mt-6 border-t border-ink-700 pt-3 text-right text-xs text-ink-400">
          ESC または背景をクリックで閉じる
        </div>
      </div>
    </div>
  );
}

/** Hook to manage which detail is currently open. */
export function useDetailModal() {
  const [state, setState] = useState<Omit<DetailModalProps, "open" | "onClose"> | null>(null);
  return {
    state,
    open: (s: Omit<DetailModalProps, "open" | "onClose">) => setState(s),
    close: () => setState(null),
  };
}
