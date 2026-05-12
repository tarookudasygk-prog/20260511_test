// Calil API types

export type CalilLibrary = {
  systemid: string;
  systemname: string;
  libkey: string;
  libid: string;
  short: string;
  formal: string;
  url_pc: string;
  address: string;
  pref: string;
  city: string;
  post: string;
  tel: string;
  geocode: string; // "longitude,latitude"
  category: string;
  image?: string;
  isil?: string;
  faid?: string;
  distance?: number;
};

// Status returned per library for a book
// "蔵書あり" | "貸出中" | "予約多数" | "館外" | "貸出不可" | "蔵書なし" | "-"
export type BookStatus = string;

// Calil check API response shape
export type CheckBookSystem = {
  status: "OK" | "Cache" | "Running" | "Error";
  reserveurl: string;
  libkey: Record<string, BookStatus>;
};

export type CheckResponse = {
  session: string;
  continue: 0 | 1;
  books: Record<string, Record<string, CheckBookSystem>>;
};

// openBD book metadata (simplified)
export type BookMeta = {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  pubdate: string;
  cover: string | null;
  description?: string;
};
