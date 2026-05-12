import { NextRequest, NextResponse } from "next/server";
import { calilLibrary } from "@/lib/calil";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/library?pref=東京都&city=渋谷区
//   or  /api/library?geocode=139.7,35.6&limit=20
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const params: Record<string, string> = {};
  const pref = sp.get("pref");
  const city = sp.get("city");
  const geocode = sp.get("geocode");
  const systemid = sp.get("systemid");
  const limit = sp.get("limit") || "50";

  if (pref) params.pref = pref;
  if (city) params.city = city;
  if (geocode) params.geocode = geocode;
  if (systemid) params.systemid = systemid;
  params.limit = limit;

  if (!pref && !geocode && !systemid) {
    return NextResponse.json(
      { error: "pref, geocode, or systemid is required" },
      { status: 400 },
    );
  }

  try {
    const data = await calilLibrary(params);
    return NextResponse.json({ libraries: data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "unknown error" },
      { status: 502 },
    );
  }
}
