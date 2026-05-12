import { NextRequest, NextResponse } from "next/server";
import type { BookMeta } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ISBN_RE = /^(?:97[89])?\d{9}[\dX]$/;

function normalizeIsbn(raw: string): string {
  return raw.replace(/[^0-9Xx]/g, "").toUpperCase();
}

// GET /api/book?isbn=9784...
// GET /api/book?q=keyword             (uses openBD coverage list + NDL is heavy;
//                                      we use Google Books for title search)
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const isbnRaw = sp.get("isbn");
  const q = sp.get("q");

  if (isbnRaw) {
    const isbn = normalizeIsbn(isbnRaw);
    if (!ISBN_RE.test(isbn)) {
      return NextResponse.json({ error: "invalid ISBN" }, { status: 400 });
    }
    return NextResponse.json(await fetchByIsbn(isbn));
  }

  if (q) {
    return NextResponse.json(await searchByKeyword(q));
  }

  return NextResponse.json(
    { error: "isbn or q is required" },
    { status: 400 },
  );
}

async function fetchByIsbn(isbn: string): Promise<{ books: BookMeta[] }> {
  // openBD has high-quality JP book metadata and is free / no key
  const res = await fetch(`https://api.openbd.jp/v1/get?isbn=${isbn}`, {
    cache: "no-store",
  });
  if (!res.ok) return { books: [] };
  const arr = (await res.json()) as Array<Record<string, unknown> | null>;
  const entry = arr[0];
  if (!entry) {
    // Fall back to Google Books
    return searchByKeyword(`isbn:${isbn}`);
  }
  const summary = (entry.summary || {}) as Record<string, string>;
  const book: BookMeta = {
    isbn,
    title: summary.title || "(タイトル不明)",
    author: summary.author || "",
    publisher: summary.publisher || "",
    pubdate: summary.pubdate || "",
    cover: summary.cover || null,
  };
  return { books: [book] };
}

async function searchByKeyword(q: string): Promise<{ books: BookMeta[] }> {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    q,
  )}&langRestrict=ja&maxResults=20&printType=books`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return { books: [] };
  const data = (await res.json()) as {
    items?: Array<{ volumeInfo: Record<string, unknown> }>;
  };
  const items = data.items || [];

  const books: BookMeta[] = [];
  for (const it of items) {
    const v = it.volumeInfo as {
      title?: string;
      authors?: string[];
      publisher?: string;
      publishedDate?: string;
      industryIdentifiers?: Array<{ type: string; identifier: string }>;
      imageLinks?: { thumbnail?: string; smallThumbnail?: string };
      description?: string;
    };
    const ids = v.industryIdentifiers || [];
    const isbn13 = ids.find((x) => x.type === "ISBN_13")?.identifier;
    const isbn10 = ids.find((x) => x.type === "ISBN_10")?.identifier;
    const isbn = isbn13 || isbn10;
    if (!isbn) continue;
    const thumb =
      v.imageLinks?.thumbnail || v.imageLinks?.smallThumbnail || null;
    books.push({
      isbn: normalizeIsbn(isbn),
      title: v.title || "(タイトル不明)",
      author: (v.authors || []).join(" / "),
      publisher: v.publisher || "",
      pubdate: v.publishedDate || "",
      cover: thumb ? thumb.replace(/^http:/, "https:") : null,
      description: v.description,
    });
  }
  return { books };
}
