import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "図書館蔵書ファインダー | Library Finder",
  description:
    "ISBN・書名からお住まいの地域の図書館の蔵書状況を横断検索できる蔵書ファインダー。カーリル蔵書検索 API を利用しています。",
  openGraph: {
    title: "図書館蔵書ファインダー",
    description:
      "本がいまどの図書館で借りられるか、ISBN・書名から横断検索できるサービス。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="font-sans">{children}</body>
    </html>
  );
}
