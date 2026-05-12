import { NextRequest, NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import type { BookMeta } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ISBN_RE = /^(?:97[89])?\d{9}[\dX]$/;

function normalizeIsbn(raw: string): string {
  return raw.replace(/[^0-9Xx]/g, "").toUpperCase();
}

// GET /api/book?isbn=9784...
// GET /api/book?q=keyword
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
  const res = await fetch(`https://api.openbd.jp/v1/get?isbn=${isbn}`, {
    cache: "no-store",
  });
  if (!res.ok) return { books: [] };
  const arr = (await res.json()) as Array<Record<string, unknown> | null>;
  const entry = arr[0];
  if (!entry) {
    return googleBooksSearch(`isbn:${isbn}`);
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
  // Primary: NDL Search (国立国会図書館サーチ). Authoritative for JP books,
  // no API key, no rate limit; returns RSS 2.0 XML.
  try {
    const ndl = await fetchNdl(q);
    if (ndl.length > 0) {
      await enrichCoversFromOpenBD(ndl);
      return { books: ndl };
    }
  } catch {
    // fall through
  }
  // Fallback: Google Books
  return googleBooksSearch(q);
}

async function fetchNdl(q: string): Promise<BookMeta[]> {
  // NDL OpenSearch supports field-specific queries (title, creator, publisher, isbn).
  // We try title first (most common intent), and if empty, fall back to creator.
  // mediatype=1 -> books only. cnt=20 keeps the response small.
  const byTitle = await ndlQuery({ title: q });
  if (byTitle.length > 0) return byTitle;
  const byCreator = await ndlQuery({ creator: q });
  return byCreator;
}

async function ndlQuery(fields: Record<string, string>): Promise<BookMeta[]> {
  const params = new URLSearchParams({ ...fields, cnt: "20", mediatype: "1" });
  const url = `https://ndlsearch.ndl.go.jp/api/opensearch?${params}`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: { "User-Agent": "library-finder/1.0" },
  });
  if (!res.ok) return [];
  const xml = await res.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    textNodeName: "#text",
  });
  const parsed = parser.parse(xml) as Record<string, unknown>;

  // Navigate to channel.item, accounting for the shape.
  const rss = (parsed.rss || {}) as Record<string, unknown>;
  const channel = (rss.channel || {}) as Record<string, unknown>;
  const rawItems = channel.item;
  if (!rawItems) return [];
  const items = Array.isArray(rawItems) ? rawItems : [rawItems];

  const books: BookMeta[] = [];
  const seen = new Set<string>();

  for (const it of items as Array<Record<string, unknown>>) {
    const isbn = extractIsbn(it);
    if (!isbn || seen.has(isbn)) continue;
    seen.add(isbn);

    books.push({
      isbn,
      title: textOf(it["title"]) || "(タイトル不明)",
      author: textOf(it["author"]) || textOf(it["dc:creator"]) || "",
      publisher: textOf(it["dc:publisher"]) || "",
      pubdate: textOf(it["dcterms:issued"]) || textOf(it["dc:date"]) || "",
      cover: null,
    });
  }
  return books;
}

function textOf(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.map(textOf).filter(Boolean).join(" / ");
  if (typeof v === "object") {
    const obj = v as Record<string, unknown>;
    if ("#text" in obj) return textOf(obj["#text"]);
  }
  return String(v);
}

function extractIsbn(item: Record<string, unknown>): string {
  const ids = item["dc:identifier"];
  const list = Array.isArray(ids) ? ids : ids ? [ids] : [];
  for (const id of list) {
    let value = "";
    let type = "";
    if (typeof id === "string") {
      value = id;
    } else if (id && typeof id === "object") {
      const obj = id as Record<string, unknown>;
      value = typeof obj["#text"] === "string" ? (obj["#text"] as string) : "";
      type =
        typeof obj["@_xsi:type"] === "string"
          ? (obj["@_xsi:type"] as string)
          : "";
    }
    if (type.includes("ISBN")) {
      const norm = normalizeIsbn(value);
      if (ISBN_RE.test(norm)) return norm;
    }
  }
  return "";
}

async function enrichCoversFromOpenBD(books: BookMeta[]): Promise<void> {
  if (books.length === 0) return;
  try {
    const isbns = books.map((b) => b.isbn).join(",");
    const res = await fetch(`https://api.openbd.jp/v1/get?isbn=${isbns}`, {
      cache: "no-store",
    });
    if (!res.ok) return;
    const arr = (await res.json()) as Array<Record<string, unknown> | null>;
    arr.forEach((entry, i) => {
      if (!entry) return;
      const summary = (entry.summary || {}) as Record<string, string>;
      if (summary.cover) books[i].cover = summary.cover;
    });
  } catch {
    // best-effort
  }
}

async function googleBooksSearch(q: string): Promise<{ books: BookMeta[] }> {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    q,
  )}&maxResults=20&printType=books`;
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
