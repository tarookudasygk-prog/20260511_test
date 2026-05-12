import { NextRequest, NextResponse } from "next/server";
import { calilCheck } from "@/lib/calil";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/check?isbn=...&systemid=Tokyo_Shibuya,Tokyo_NDL  (initial request)
// GET /api/check?session=...                                (polling)
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const session = sp.get("session");
  const isbn = sp.get("isbn");
  const systemid = sp.get("systemid");

  const params: Record<string, string> = {};
  if (session) {
    params.session = session;
  } else {
    if (!isbn || !systemid) {
      return NextResponse.json(
        { error: "isbn and systemid are required for initial request" },
        { status: 400 },
      );
    }
    params.isbn = isbn;
    params.systemid = systemid;
  }

  try {
    const data = await calilCheck(params);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "unknown error" },
      { status: 502 },
    );
  }
}
