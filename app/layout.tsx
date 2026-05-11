import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IP企業ストラテジー図鑑 | Strategic IP Company Codex",
  description:
    "代表IPキャラクターを入口に、各社の公開中期経営計画から読み解く戦略示唆を実務向けに整理したインタラクティブ図鑑。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
