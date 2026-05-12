"use client";

import { useEffect, useMemo, useState } from "react";
import type { CalilLibrary } from "@/lib/types";
import { PREFECTURES } from "@/lib/prefectures";

type Props = {
  selectedSystemIds: string[];
  onChange: (systemIds: string[]) => void;
};

const MAX_SELECT = 5;

export function LibrarySelectStep({ selectedSystemIds, onChange }: Props) {
  const [pref, setPref] = useState<string>("");
  const [city, setCity] = useState("");
  const [libs, setLibs] = useState<CalilLibrary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [didSearch, setDidSearch] = useState(false);

  // Group libraries by systemid (library system) — Calil's check API takes
  // systemid, and one systemid covers all branches in that municipality.
  const systems = useMemo(() => {
    const map = new Map<
      string,
      { systemid: string; systemname: string; libraries: CalilLibrary[] }
    >();
    for (const l of libs) {
      const cur = map.get(l.systemid);
      if (cur) cur.libraries.push(l);
      else
        map.set(l.systemid, {
          systemid: l.systemid,
          systemname: l.systemname,
          libraries: [l],
        });
    }
    return [...map.values()].sort((a, b) =>
      a.systemname.localeCompare(b.systemname, "ja"),
    );
  }, [libs]);

  async function run() {
    if (!pref) return;
    setLoading(true);
    setError(null);
    setDidSearch(true);
    try {
      const usp = new URLSearchParams({ pref });
      if (city.trim()) usp.set("city", city.trim());
      usp.set("limit", "200");
      const res = await fetch(`/api/library?${usp}`);
      const data = (await res.json()) as {
        libraries?: CalilLibrary[];
        error?: string;
      };
      if (data.error) setError(data.error);
      else setLibs(data.libraries || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "通信エラー");
    } finally {
      setLoading(false);
    }
  }

  async function useGeolocation() {
    if (!navigator.geolocation) {
      setError("お使いの環境では位置情報が利用できません");
      return;
    }
    setLoading(true);
    setError(null);
    setDidSearch(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const geocode = `${pos.coords.longitude},${pos.coords.latitude}`;
          const usp = new URLSearchParams({ geocode, limit: "30" });
          const res = await fetch(`/api/library?${usp}`);
          const data = (await res.json()) as {
            libraries?: CalilLibrary[];
            error?: string;
          };
          if (data.error) setError(data.error);
          else setLibs(data.libraries || []);
        } catch (e) {
          setError(e instanceof Error ? e.message : "通信エラー");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(`位置情報を取得できませんでした：${err.message}`);
        setLoading(false);
      },
      { timeout: 8000 },
    );
  }

  function toggle(systemid: string) {
    const isOn = selectedSystemIds.includes(systemid);
    if (isOn) {
      onChange(selectedSystemIds.filter((s) => s !== systemid));
    } else {
      if (selectedSystemIds.length >= MAX_SELECT) return;
      onChange([...selectedSystemIds, systemid]);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[180px_1fr_auto]">
        <select
          className="field"
          value={pref}
          onChange={(e) => setPref(e.target.value)}
        >
          <option value="">都道府県を選択</option>
          {PREFECTURES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <input
          className="field"
          placeholder="市区町村（任意：例 渋谷区）"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") run();
          }}
        />
        <button
          className="btn btn-primary"
          onClick={run}
          disabled={loading || !pref}
        >
          {loading ? <span className="spinner" /> : "図書館を検索"}
        </button>
      </div>

      <div className="flex items-center gap-2 text-xs text-ink-500">
        <button
          type="button"
          className="underline decoration-dotted underline-offset-2 hover:text-brand-500"
          onClick={useGeolocation}
        >
          ↳ 現在地から近くの図書館を探す
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-paper-300 bg-paper-100 px-3 py-2 text-sm text-ink-600">
          {error}
        </div>
      )}

      {didSearch && !loading && libs.length === 0 && !error && (
        <div className="rounded-lg border border-paper-300 bg-paper-100 px-3 py-2 text-sm text-ink-600">
          該当する図書館が見つかりませんでした。市区町村を変えてお試しください。
        </div>
      )}

      {systems.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between text-xs text-ink-500">
            <span>
              <strong className="text-ink-800">{systems.length}</strong>{" "}
              つの図書館システム（合計 {libs.length} 館）
            </span>
            <span>
              選択中 {selectedSystemIds.length} / {MAX_SELECT}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {systems.map((sys) => {
              const isOn = selectedSystemIds.includes(sys.systemid);
              const reachedMax =
                !isOn && selectedSystemIds.length >= MAX_SELECT;
              return (
                <button
                  key={sys.systemid}
                  onClick={() => toggle(sys.systemid)}
                  disabled={reachedMax}
                  className={[
                    "group flex items-start gap-3 rounded-xl border bg-white p-3 text-left transition",
                    isOn
                      ? "border-brand-400 ring-2 ring-brand-200"
                      : "border-paper-300 hover:border-brand-400",
                    reachedMax ? "opacity-40 cursor-not-allowed" : "",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2",
                      isOn
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-paper-300",
                    ].join(" ")}
                  >
                    {isOn && (
                      <svg
                        viewBox="0 0 20 20"
                        className="h-3.5 w-3.5"
                        fill="currentColor"
                      >
                        <path d="M7.629 13.314L4.343 10.03l-1.414 1.414 4.7 4.7 9.9-9.9-1.414-1.414z" />
                      </svg>
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-ink-900">
                      {sys.systemname}
                    </div>
                    <div className="mt-0.5 line-clamp-1 text-xs text-ink-500">
                      {sys.libraries.length} 館 ・{" "}
                      {sys.libraries
                        .slice(0, 3)
                        .map((l) => l.short)
                        .join(" / ")}
                      {sys.libraries.length > 3 ? " など" : ""}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
