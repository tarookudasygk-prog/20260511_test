export type Source = {
  label: string;
  url: string;
};

export type Character = {
  name: string;
  /** 1-2 emoji or short symbol used as a fallback "art". Optional. */
  glyph?: string;
  /** Short tagline shown on the encyclopedia card */
  tagline?: string;
  /** Image URL (Wikipedia/Wikimedia preferred). Optional. */
  imageUrl?: string;
  /** Image credit/license note */
  imageCredit?: string;
};

export type Insight = {
  headline: string;
  body: string;
  /** Rich detail shown in a modal — background, why it matters, what to watch */
  detail?: string;
};

export type WatchPoint = {
  item: string;
  /** Rich detail shown in a modal */
  detail?: string;
};

export type Company = {
  id: string;
  /** Sequential codex number, like a Pokédex No. */
  no: number;
  name: string;
  nameEn: string;
  /** Ticker like "7974" if listed, else null */
  ticker?: string;
  /** "上場(東証プライム)" / "非上場" etc. */
  listing: string;
  hq: string;
  /** Short positioning sentence used on detail header */
  positioning: string;
  /** Categories for filtering */
  tags: string[];
  /** Primary brand color hex used for cards/detail accents */
  accent: string;
  /** Background gradient stops for the hero panel */
  gradient: [string, string];
  /** Representative IP character(s). First entry is the cover. */
  characters: Character[];
  /** Name of the latest publicly disclosed mid-term plan */
  planName: string;
  /** Period it covers, e.g. "FY2024-FY2026" */
  planPeriod: string;
  /** 3-5 strategic pillars from the public plan */
  pillars: { title: string; detail: string }[];
  /** Publicly disclosed quantitative targets (only verifiable ones; mark unknown explicitly). */
  targets: { label: string; value: string; note?: string }[];
  /** 3-5 "insight" bullets framed for practitioners — strategic논点 derived from the public plan. */
  insights: Insight[];
  /** What to watch — forward-looking signals that matter for the next 12-24 months. */
  watch: WatchPoint[];
  /** Company logo image URL */
  logoUrl?: string;
  /** Pointers to source documents users can read themselves. */
  sources: Source[];
};
