# 図書館蔵書ファインダー / Library Finder

ISBN・書名から、お住まいの地域の図書館で本がすぐ借りられるかを横断検索できるサービス。
全国 7,000 以上の図書館を網羅する **カーリル 図書館API** を利用しています。

## 3 ステップで使えます

1. **書籍を選ぶ** — ISBN または 書名・著者名で検索
2. **図書館を選ぶ** — 都道府県・市区町村、または現在地から（最大 5 つの図書館システム）
3. **蔵書状況を見る** — 各館の貸出状況をリアルタイムに表示

## 利用API

- [カーリル 図書館API](https://calil.jp/doc/api.html) — 図書館検索 (`/library`) と蔵書検索 (`/check`)
- [openBD](https://openbd.jp/) — 日本書籍メタデータ（ISBN）
- Google Books API — タイトル / 著者キーワード検索

## 技術スタック

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Server-side proxy via Route Handlers（`/app/api/*`） — Calil API のクライアント側
  CORS 制限を回避し、appkey をブラウザに露出させない構成

## ローカル開発

```bash
npm install
npm run dev
# http://localhost:3000
```

### 環境変数（任意）

カーリルの appkey はサーバー側でのみ使用されます。差し替える場合は：

```bash
# .env.local
CALIL_APPKEY=your_appkey_here
```

未設定の場合はリポジトリ同梱の公開デモキーが使用されます。

## Vercel へのデプロイ

1. <https://vercel.com/new> でこのリポジトリをインポート
2. Framework Preset は **Next.js** が自動検出されます
3. （必要であれば）Environment Variables に `CALIL_APPKEY` を設定
4. **Deploy**

## 免責事項

蔵書ステータスは API 取得時点のスナップショットです。実際の貸出状況は各図書館の公式 OPAC でご確認ください。表示中のデータは各サービス提供者に帰属します。
