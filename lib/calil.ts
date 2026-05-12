// Server-side helpers for talking to the Calil API.
// Calil returns JSONP by default — passing callback=no makes the response a
// bare JSON document, which is what we want from our Next.js API routes.

const CALIL_BASE = "https://api.calil.jp";

export const APPKEY =
  process.env.CALIL_APPKEY || "bc57f68dff9da6aad69b2acac0acfa0e";

async function calilJson<T>(path: string, params: Record<string, string>): Promise<T> {
  const usp = new URLSearchParams({
    ...params,
    appkey: APPKEY,
    format: "json",
    callback: "no",
  });
  const url = `${CALIL_BASE}${path}?${usp.toString()}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Calil API error (${res.status})`);
  }
  return (await res.json()) as T;
}

export async function calilLibrary(params: Record<string, string>) {
  return calilJson<unknown[]>("/library", params);
}

export async function calilCheck(params: Record<string, string>) {
  return calilJson<unknown>("/check", params);
}
