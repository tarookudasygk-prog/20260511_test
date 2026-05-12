"use client";

import { useEffect, useRef, useState } from "react";
import { StatusBadge } from "./StatusBadge";
import type {
  BookMeta,
  CalilLibrary,
  CheckBookSystem,
  CheckResponse,
} from "@/lib/types";

type Props = {
  book: BookMeta;
  systemIds: string[];
  onReset: () => void;
};

type SystemInfo = {
  systemid: string;
  systemname: string;
  libraries: CalilLibrary[];
};

export function ResultStep({ book, systemIds, onReset }: Props) {
  const [data, setData] = useState<CheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [polling, setPolling] = useState(true);
  const [sysInfo, setSysInfo] = useState<Record<string, SystemInfo>>({});
  const tries = useRef(0);

  // Resolve display name & branch list per systemid (used in the table header).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result: Record<string, SystemInfo> = {};
      await Promise.all(
        systemIds.map(async (sid) => {
          try {
            const res = await fetch(
              `/api/library?systemid=${encodeURIComponent(sid)}&limit=200`,
            );
            const d = (await res.json()) as { libraries?: CalilLibrary[] };
            const libs = d.libraries || [];
            result[sid] = {
              systemid: sid,
              systemname: libs[0]?.systemname || sid,
              libraries: libs,
            };
          } catch {
            result[sid] = { systemid: sid, systemname: sid, libraries: [] };
          }
        }),
      );
      if (!cancelled) setSysInfo(result);
    })();
    return () => {
      cancelled = true;
    };
  }, [systemIds]);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    async function step(session?: string) {
      tries.current += 1;
      const usp = new URLSearchParams();
      if (session) usp.set("session", session);
      else {
        usp.set("isbn", book.isbn);
        usp.set("systemid", systemIds.join(","));
      }
      try {
        const res = await fetch(`/api/check?${usp}`);
        const d = (await res.json()) as CheckResponse & { error?: string };
        if (cancelled) return;
        if (d.error) {
          setError(d.error);
          setPolling(false);
          return;
        }
        setData(d);
        if (d.continue === 1 && tries.current < 15) {
          timer = setTimeout(() => step(d.session), 2000);
        } else {
          setPolling(false);
        }
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "通信エラー");
        setPolling(false);
      }
    }

    step();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [book.isbn, systemIds]);

  const bookResult = data?.books?.[book.isbn];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-paper-300 bg-paper-100 p-3">
        <div className="text-sm text-ink-700">
          <span className="text-ink-500">対象書籍：</span>
          <strong>{book.title}</strong>
          <span className="ml-2 text-xs text-ink-500">ISBN {book.isbn}</span>
        </div>
        <button className="btn btn-ghost" onClick={onReset}>
          新しい検索
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-accent-red bg-paper-100 px-4 py-3 text-sm text-accent-red">
          エラー：{error}
        </div>
      )}

      {polling && (
        <div className="flex items-center gap-3 rounded-xl border border-paper-300 bg-white px-4 py-3 text-sm text-ink-600">
          <span className="spinner spinner-dark" />
          各図書館に問い合わせ中…（最大30秒ほどかかります）
        </div>
      )}

      <div className="space-y-4">
        {systemIds.map((sid) => {
          const info = sysInfo[sid];
          const sys: CheckBookSystem | undefined = bookResult?.[sid];
          return (
            <SystemResult
              key={sid}
              systemId={sid}
              info={info}
              data={sys}
              polling={polling}
            />
          );
        })}
      </div>

      <p className="text-[11px] leading-relaxed text-ink-500">
        出典：
        <a
          href="https://calil.jp/"
          className="underline decoration-dotted hover:text-brand-500"
          target="_blank"
          rel="noreferrer"
        >
          カーリル蔵書検索API
        </a>{" "}
        ・ 表示中の蔵書ステータスは各図書館の OPAC をリアルタイムに問い合わせた結果です。
      </p>
    </div>
  );
}

function SystemResult({
  systemId,
  info,
  data,
  polling,
}: {
  systemId: string;
  info?: SystemInfo;
  data?: CheckBookSystem;
  polling: boolean;
}) {
  const branchEntries = data ? Object.entries(data.libkey || {}) : [];
  const status = data?.status;

  return (
    <div className="overflow-hidden rounded-xl border border-paper-300 bg-white shadow-card">
      <header className="flex items-baseline justify-between gap-3 border-b border-paper-200 bg-paper-50 px-4 py-3">
        <div>
          <h3 className="font-semibold text-ink-900">
            {info?.systemname || systemId}
          </h3>
          {info && (
            <p className="mt-0.5 text-xs text-ink-500">
              対象 {info.libraries.length} 館
            </p>
          )}
        </div>
        {data?.reserveurl && (
          <a
            className="text-xs text-brand-500 underline decoration-dotted hover:text-brand-600"
            href={data.reserveurl}
            target="_blank"
            rel="noreferrer"
          >
            OPACで詳細・予約 →
          </a>
        )}
      </header>

      <div className="px-4 py-3">
        {!data ? (
          <div className="flex items-center gap-2 text-sm text-ink-500">
            <span className="spinner spinner-dark" />
            問い合わせ中…
          </div>
        ) : status === "Error" ? (
          <p className="text-sm text-accent-red">
            この図書館システムでは情報を取得できませんでした。
          </p>
        ) : branchEntries.length === 0 ? (
          status === "Running" || polling ? (
            <div className="flex items-center gap-2 text-sm text-ink-500">
              <span className="spinner spinner-dark" />
              問い合わせ中…
            </div>
          ) : (
            <p className="text-sm text-ink-500">
              この図書館システムには蔵書がありません。
            </p>
          )
        ) : (
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {branchEntries
              .sort(([a], [b]) => a.localeCompare(b, "ja"))
              .map(([branch, st]) => (
                <div
                  key={branch}
                  className="flex items-center justify-between gap-3 rounded-lg border border-paper-200 px-3 py-2"
                >
                  <span className="truncate text-sm text-ink-800">{branch}</span>
                  <StatusBadge status={st} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
