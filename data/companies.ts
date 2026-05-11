import type { Company } from "./types";

/**
 * すべての中期経営計画情報は公開IR資料 / 適時開示 / 統合報告書 等の
 * 公的な一次資料から事実のみを抽出したもの。確認不能な項目は
 * "公開情報からは不明" と明記し、推測値は含めない。
 * 必ず sources の URL を起点に最新情報を確認のこと。
 */
export const COMPANIES: Company[] = [
  {
    id: "nintendo",
    no: 1,
    name: "任天堂",
    nameEn: "Nintendo",
    ticker: "7974",
    listing: "東証プライム上場",
    hq: "京都市南区",
    positioning:
      "ハード/ソフト/サービスを自社で一貫提供し、『中期経営計画を公表しない』という独自の経営方針を貫くIPの本丸。",
    tags: ["ゲーム", "IP横展開", "ハード"],
    accent: "#e60012",
    gradient: ["#ff5b6e", "#7a0007"],
    characters: [
      { name: "マリオ", glyph: "🍄", tagline: "世界で最も認知度の高いゲームIP" },
      { name: "ゼルダ／ピカチュウ／どうぶつの森", glyph: "🗡️" },
    ],
    planName: "中期経営計画は公表せず（経営方針のみ開示）",
    planPeriod: "通期業績見通しと経営方針説明会で代替",
    pillars: [
      {
        title: "『娯楽の独自性追求』『IP拡大』",
        detail:
          "中期数値計画を出さない代わりに、ゲーム機を入口に映像・テーマパーク・グッズへ任天堂IPの接点を拡大する基本方針を継続。Nintendo Switch 後継機 (Switch 2) のローンチ年度。",
      },
      {
        title: "Switch 2 立ち上げ局面",
        detail:
          "2026年3月期通期見通し（2025/11/4 上方修正）: 売上高 2兆2,500億円、営業利益 3,700億円、Switch 2 ハード販売 1,900万台。歴代最大級のローンチ年度に。",
      },
      {
        title: "Nintendo Account を軸とした顧客資産",
        detail:
          "Switch → Switch 2 への移行で、累計1.5億台超のユーザー基盤を引き継ぐ設計。アカウント連携・ソフト互換性が KGI に近い役割。",
      },
      {
        title: "IPの非ゲーム展開",
        detail:
          "USJ スーパー・ニンテンドー・ワールド、ユニバーサル・エプコット、ザ・スーパーマリオブラザーズ・ムービー等、ゲーム外売上で本業の谷を平準化。",
      },
    ],
    targets: [
      {
        label: "中期経営計画の有無",
        value: "公表せず（経営判断の柔軟性確保が理由）",
      },
      { label: "FY26 売上高見通し", value: "2兆2,500億円", note: "2025/11/4 上方修正後" },
      { label: "FY26 営業利益見通し", value: "3,700億円" },
      { label: "FY26 Switch 2 販売目標", value: "1,900万台" },
    ],
    insights: [
      {
        headline: "『中計を出さない』こと自体が戦略",
        body: "ヒット商品の予見不可能性を理由に明示的に中計を策定しない方針を継続。投資家への期待値マネジメントとして合理的だが、同業他社との比較分析は困難になる。ヒット依存型ビジネスの正直なコミュニケーションモデル。",
      },
      {
        headline: "Switch 2 移行が KGI、ハード/ソフトの両面で勝負",
        body: "累計1.5億台級ユーザー資産の世代交代が成否を分ける。ハード単独の利益貢献より、Switch 2 を起点にしたソフト/オンライン/IP事業の積み増しに本質がある。",
      },
      {
        headline: "IP横展開の歩留まりが第二エンジン",
        body: "映画・テーマパーク・グッズなど非ゲーム売上の比率上昇が、本業ゲームのサイクル谷を平準化。次世代機ローンチ年度においてもIP事業が下支え。",
      },
    ],
    watch: [
      "Switch 2 ローンチ年度の初年度普及曲線と粗利率",
      "ザ・スーパーマリオブラザーズ・ムービー2 (2026年公開) の興行",
      "テーマパーク第3エリア・新規地域への拡張計画",
    ],
    sources: [
      { label: "任天堂 経営方針", url: "https://www.nintendo.co.jp/ir/management/policy.html" },
      { label: "2026年3月期 第2四半期決算短信", url: "https://www.nintendo.co.jp/ir/pdf/2025/251104.pdf" },
      { label: "任天堂 IRライブラリ", url: "https://www.nintendo.co.jp/ir/library/events/index.html" },
    ],
  },

  {
    id: "bandai-namco",
    no: 2,
    name: "バンダイナムコホールディングス",
    nameEn: "Bandai Namco Holdings",
    ticker: "7832",
    listing: "東証プライム上場",
    hq: "東京都港区",
    positioning:
      "玩具・ゲーム・映像・ライブが連動する『IP軸戦略』の代表企業。ガンダム経済圏を保有。",
    tags: ["IP軸戦略", "玩具", "ゲーム", "映像"],
    accent: "#ff7a00",
    gradient: ["#ffb04a", "#7a3a00"],
    characters: [
      { name: "RX-78-2 ガンダム", glyph: "🤖", tagline: "1979年から続くフラッグシップIP" },
      { name: "ドラゴンボール／ワンピース／アイマス／たまごっち", glyph: "🟡" },
    ],
    planName: "中期計画『Connect with Fans』",
    planPeriod: "2025年4月～2028年3月 (3か年)",
    pillars: [
      {
        title: "IP軸戦略 — IPを『そだてつづける』",
        detail:
          "IP単位で玩具・ゲーム・アミューズメント・ライブ・映像を組み合わせる『IPバリューチェーン』を世界規模で展開。",
      },
      {
        title: "『CW360』新設 — 360度ファン接点",
        detail:
          "全方位のファン接点を統合管理する新組織を設置し、ファン体験の一元化とリカーリング収益化を加速。",
      },
      {
        title: "ライセンス事業強化",
        detail:
          "自社IPの社外ライセンスアウトを拡大、収益の安定化と海外展開を同時推進。",
      },
      {
        title: "成長投資 約6,000億円",
        detail:
          "中計3年間で約6,000億円の戦略投資枠（IP拡張・M&A・体験投資）。",
      },
    ],
    targets: [
      { label: "売上高目標 (FY2028最終年度)", value: "1兆4,500億円" },
      { label: "営業利益目標", value: "2,000億円" },
      { label: "海外売上比率", value: "50%" },
      { label: "成長投資枠 (3年累計)", value: "約6,000億円" },
    ],
    insights: [
      {
        headline: "『IP軸経営』を最初に標準化した企業",
        body: "事業セグメントではなくIP単位で PL/CF を管理する組織運営は、エンタメ業界の参照モデル。新規IPでも同じバリューチェーン (玩具→ゲーム→映像→ライブ) に乗せる再現性に強み。",
      },
      {
        headline: "6,000億円投資の回収シナリオが論点",
        body: "中計累計で約6,000億円の戦略投資は同社史上最大規模。回収できれば IP軸の規模拡大、回収シナリオが崩れれば資本効率の悪化に直結。投資先 (IP/M&A/CAPEX) の内訳と進捗が KPI。",
      },
      {
        headline: "ガンダム偏重からの脱却度合い",
        body: "ガンダム関連売上は群を抜くが、それ以外のIP (ドラゴンボール、ワンピース、アイマス) の成長が中計達成の鍵。IPポートフォリオの分散KPIの開示充実が望まれる。",
      },
    ],
    watch: [
      "GUNDAM プロジェクトの新規発表 (映像/テーマパーク)",
      "CW360 経由のファン会員 (Bandai Namco ID) 推移",
      "M&A による IP / スタジオ取り込みの実行",
    ],
    sources: [
      { label: "バンダイナムコHD 中期計画", url: "https://www.bandainamco.co.jp/ir/message/midtermplan.html" },
      { label: "統合レポート2025 中期計画抜粋", url: "https://www.bandainamco.co.jp/ir/library/assets/pdf/2025/integratedreports2025_jp_34-39.pdf" },
    ],
  },

  {
    id: "sega-sammy",
    no: 3,
    name: "セガサミーホールディングス",
    nameEn: "SEGA SAMMY Holdings",
    ticker: "6460",
    listing: "東証プライム上場",
    hq: "東京都品川区",
    positioning:
      "ソニックを起点にグローバルブロックバスター化を狙う『スーパーゲーム』構想と遊技機の二輪経営。",
    tags: ["ゲーム", "パチスロ", "グローバル"],
    accent: "#0079c1",
    gradient: ["#4fc3ff", "#003a66"],
    characters: [
      { name: "ソニック", glyph: "💨", tagline: "映画3作続けてヒット (累計興収46億ドル超)、グローバル再起の象徴" },
      { name: "桐生一馬／ペルソナ／ぷよぷよ／バーチャファイター", glyph: "🐉" },
    ],
    planName: "中期計画『WELCOME TO THE NEXT LEVEL!』",
    planPeriod: "FY2025/3～FY2027/3 (3か年)",
    pillars: [
      {
        title: "ゲーム発IPの規模拡大",
        detail:
          "ソニックの映像/グッズ/イベント展開、Like a Dragon (龍が如く) シリーズの海外売上拡大、ペルソナのグローバル磨き込み。",
      },
      {
        title: "『スーパーゲーム』構想",
        detail:
          "AAA級グローバルブロックバスターへの開発資源集中。中量級タイトルを減らし、長期売上を作れる大型タイトルへ。",
      },
      {
        title: "遊技機事業での安定収入確保",
        detail:
          "スマートパチスロ移行を機にパチスロ/パチンコ合算シェア No.1 を志向。",
      },
      {
        title: "海外スタジオ取り込み (Rovio)",
        detail:
          "Rovio (Angry Birds) を取り込み、モバイル基盤と海外マーケティング知見を補完。",
      },
    ],
    targets: [
      { label: "3か年累計 調整後EBITDA", value: "2,300億円超" },
      { label: "3か年平均 ROE", value: "10%超" },
      { label: "パチスロ/パチンコ", value: "合算シェアNo.1を志向" },
    ],
    insights: [
      {
        headline: "ソニック映画は『日本IP × ハリウッド製作』の成功事例",
        body: "ソニック映画3作の全世界興収累計が46億ドル超に到達。日本IPの実写ハリウッド化の最重要参照ケース。次は Like a Dragon の海外映像化が試金石。",
      },
      {
        headline: "『スーパーゲーム』はジャンル選別の宣言",
        body: "中量級を減らしAAAに資源を集中する戦略は、失敗時の影響が大きいが、Sonic映画と Like a Dragon の欧米躍進で初期成果が出始めている。",
      },
      {
        headline: "遊技機の景気感度がボラの源泉",
        body: "スマートパチスロで機種需要は回復基調だが、規制変更リスクは継続。中計でも非ゲーム事業のキャッシュ寄与は重要視。",
      },
    ],
    watch: [
      "Sonic映画/シリーズの興行とライセンス売上",
      "Like a Dragon シリーズの欧米実売",
      "スマートパチスロの設置動向",
    ],
    sources: [
      { label: "セガサミーHD 中長期計画", url: "https://www.segasammy.co.jp/en/ir/management/plan/" },
      { label: "CFOメッセージ", url: "https://www.segasammy.co.jp/cms/wp-content/uploads/pdf/ja/ir/ir_2025_web_03_jp.pdf" },
    ],
  },

  {
    id: "square-enix",
    no: 4,
    name: "スクウェア・エニックス・ホールディングス",
    nameEn: "Square Enix Holdings",
    ticker: "9684",
    listing: "東証プライム上場",
    hq: "東京都新宿区",
    positioning:
      "FF / DQ を擁する RPG の代表企業。マルチプラットフォーム化と組織再起動の最中。",
    tags: ["ゲーム", "RPG", "改革中"],
    accent: "#7b3fbf",
    gradient: ["#b984f0", "#3b1968"],
    characters: [
      { name: "クラウド (FF7)", glyph: "⚔️", tagline: "FF7 Rebirth リメイク三部作中盤、マルチプラットフォーム展開へ" },
      { name: "勇者 (ドラクエ) ／ NieR ／ キングダムハーツ", glyph: "🛡️" },
    ],
    planName: "中期経営計画『Square Enix Reboots and Awakens 〜再起動の3年間〜』",
    planPeriod: "FY2025/3～FY2027/3 (2024/5/13発表)",
    pillars: [
      {
        title: "DE事業の開発体制最適化・生産性向上",
        detail:
          "桐生隆司新社長体制で、開発タイトルの取捨選択を厳格化。減損損失を出した教訓を踏まえ、ナンバリングタイトル/HD-2D/モバイルの3層構造で IP磨き込み。",
      },
      {
        title: "コンタクトポイント (顧客接点) 強化",
        detail:
          "マルチプラットフォーム戦略への転換 — 従来のPS5中心思考を改め、PC/Xbox/Nintendo 含む幅広い展開へ。",
      },
      {
        title: "経営基盤の安定化",
        detail:
          "不採算事業の整理、ROE 改善、ガバナンス強化。",
      },
      {
        title: "成長投資と株主還元のキャピタル・アロケーション",
        detail:
          "3か年累計 800〜1,000億円の戦略投資枠 (成長投資 or 株主還元)。",
      },
    ],
    targets: [
      { label: "FY2027/3 連結営業利益率", value: "15%" },
      { label: "3か年累計 戦略投資枠", value: "800〜1,000億円" },
    ],
    insights: [
      {
        headline: "『独占』を捨てた最初の和ゲーパブリッシャー",
        body: "PS5独占の見直しは、ハードメーカー連携の前払金より PC/全機種での生涯売上を取りに行く判断。日本の他パブリッシャーの判断基準にも影響しうる。",
      },
      {
        headline: "AI活用を開発合理化と顧客体験の両面で明言",
        body: "桐生体制で『AI元年』を掲げ、デバッグ・QA・ローカライズ等のオフェンス/ディフェンス両面でAI実装を進める。和ゲー業界では先行的な公表事例。",
      },
      {
        headline: "ヒット依存の高ボラティリティをどう均すか",
        body: "FF/DQ大型タイトルの発売有無で業績が振れる構造は不変。HD-2D (オクトパストラベラー系) が中規模ヒットの安定供給を担うが、ポートフォリオの厚みは引き続き課題。",
      },
    ],
    watch: [
      "FF7 Rebirth マルチプラットフォーム展開時期",
      "営業利益率15%目標への進捗",
      "AI活用による開発期間短縮の実証",
    ],
    sources: [
      { label: "新中期経営計画 (2024/5/13)", url: "https://www.hd.square-enix.com/jpn/ir/library/pdf/20240513_01.pdf" },
      { label: "中期経営計画 進捗報告 (2025/11/6)", url: "https://www.hd.square-enix.com/jpn/ir/pdf/20251106_01.pdf" },
      { label: "IRライブラリ", url: "https://www.hd.square-enix.com/jpn/ir/library/" },
    ],
  },

  {
    id: "capcom",
    no: 5,
    name: "カプコン",
    nameEn: "Capcom",
    ticker: "9697",
    listing: "東証プライム上場",
    hq: "大阪市中央区",
    positioning:
      "営業10期連続増益記録を支える『単一コンテンツ多角利用 (SCMU)』の代表的実践企業。",
    tags: ["ゲーム", "増益記録", "IP磨き込み"],
    accent: "#f3a800",
    gradient: ["#ffd34d", "#7a4d00"],
    characters: [
      { name: "ハンター (モンスターハンター)", glyph: "🐲", tagline: "シリーズ累計販売1億本超" },
      { name: "リュウ／レオン／ダンテ", glyph: "👊" },
    ],
    planName: "第4次中期経営計画『成長のための基盤づくり』",
    planPeriod: "2025年度～2027年度 (3か年)",
    pillars: [
      {
        title: "新作投入とリピート (カタログ) 販売の拡大",
        detail:
          "Single Content Multiple Usage — 1本のゲームを多プラットフォーム/多地域/長期間で売り続ける『IP複利』モデル。",
      },
      {
        title: "欧米・新興国へのグローバル展開",
        detail:
          "デジタル販売とローカライズで海外売上比率を継続上昇。",
      },
      {
        title: "デジタルマーケティング強化",
        detail:
          "Steamなど直販プラットフォームでの恒常的キャンペーン運用。",
      },
      {
        title: "アミューズメント施設/機器とのシナジー",
        detail:
          "ゲームIP の体験/物販/コラボ展開で『ファン経済圏』を厚くする。",
      },
    ],
    targets: [
      { label: "FY2026/3 売上高 計画", value: "1,900億円 (+12%)" },
      { label: "FY2026/3 営業利益 計画", value: "730億円 (+11%)" },
      { label: "営業増益目標", value: "11期連続10%以上を志向" },
    ],
    insights: [
      {
        headline: "SCMU は『IP複利』を最も実証している",
        body: "新作タイトル年1-2本ペースでも、過去カタログのリマスター/値下げ販売で毎年売上を再生産。日本ゲーム企業のキャッシュフロー型ベンチマーク。",
      },
      {
        headline: "営業利益率30%超の高収益構造",
        body: "内製エンジン RE ENGINE + デジタル販売 + 自社IP の三点セットでマージン構造が極めて健全。ヒット作不発時の耐性も他社比較で高い。",
      },
      {
        headline: "モンハン依存度の偏在が論点",
        body: "モンハンの売上シェアが大きく、他IP (バイオ・ストリートファイター・デビルメイクライ) のシリーズ力でいかに分散させるかが中計の隠れた論点。",
      },
    ],
    watch: [
      "モンスターハンターワイルズの実売推移",
      "リマスター/コレクションタイトルの本数と粗利寄与",
      "eスポーツ事業の単独黒字化",
    ],
    sources: [
      { label: "カプコン 経営方針・戦略", url: "https://www.capcom.co.jp/ir/english/management/strategies.html" },
      { label: "FY2025/3 決算説明資料", url: "https://www.capcom.co.jp/ir/data/pdf/explanation/2025/full/explanation_2025_full_02.pdf" },
    ],
  },

  {
    id: "sanrio",
    no: 6,
    name: "サンリオ",
    nameEn: "Sanrio",
    ticker: "8136",
    listing: "東証プライム上場",
    hq: "東京都品川区",
    positioning:
      "辻朋邦社長就任後、ハローキティ依存から多キャラ・ロイヤリティ型ビジネスに転換した V字回復企業。",
    tags: ["キャラクター", "ライセンス", "復活劇"],
    accent: "#ff5da2",
    gradient: ["#ff95c4", "#7a214a"],
    characters: [
      { name: "ハローキティ", glyph: "🎀", tagline: "2024年に50周年。グローバル最大級のキャラクターIP" },
      { name: "シナモロール／クロミ／ポムポムプリン", glyph: "💜" },
    ],
    planName: "中期経営計画『不確実な成長から、安定・永続成長へ』",
    planPeriod: "FY2025/3～FY2027/3 (3か年, 2024年5月発表/2025年5月アップデート)",
    pillars: [
      {
        title: "マーケティング・営業戦略の見直しでグローバルでEvergreenなIPへ",
        detail:
          "SNS活用・年次キャラ大賞などを通じ、複数キャラを世界水準で長寿IP化する設計。",
      },
      {
        title: "グローバル成長基盤の構築",
        detail:
          "北米/中国/ASEAN を中心に、現地ライセンシー開拓・直営拠点拡充。",
      },
      {
        title: "IPポートフォリオ拡充とマネタイズの多層化",
        detail:
          "シナモロール・クロミ等のNo.2/No.3 キャラを意図的に成長させ、ハローキティ一極依存から脱却。コラボ・体験・デジタル化で多層収益化。",
      },
      {
        title: "オーガニック投資 + M&A の積極展開",
        detail:
          "3年累計でオーガニック投資 300億円超 + M&A/マイノリティ出資 500億円超を準備。",
      },
    ],
    targets: [
      { label: "売上高目標 (FY2027/3)", value: "1,750億円" },
      { label: "営業利益目標", value: "650億円以上" },
      { label: "長期営業利益CAGR", value: "10年平均10%以上" },
    ],
    insights: [
      {
        headline: "『キャラクター・ポートフォリオ経営』の教科書ケース",
        body: "1キャラ依存のIP企業がいかに多キャラに分散できるかをデジタル時代に再実証。SNS人気投票/年次大賞をマーケティング装置として回す設計が秀逸。",
      },
      {
        headline: "ライセンスアウト主体への転換が利益構造を変えた",
        body: "小売・物販中心の旧モデルから、自社で在庫を持たないライセンス主体へ。営業利益率の劇的改善は、IPホルダーの『どこで儲けるか』の選択を再考させる材料。",
      },
      {
        headline: "ハローキティ50周年は終わりではなく再開",
        body: "アニバーサリーを大型コラボの起点にし、グローバルブランドコラボ (高級・ストリート両方) で再ブランディング中。長寿IPのリスタート手法のベンチマーク。",
      },
    ],
    watch: [
      "海外ロイヤリティ売上比率の四半期推移",
      "新規/復活キャラクターのSNS人気順位",
      "M&A・マイノリティ出資の具体案件公表",
    ],
    sources: [
      { label: "サンリオ 中期経営計画", url: "https://corporate.sanrio.co.jp/ir/about/strategy/" },
      { label: "2025年5月 アップデート資料", url: "https://corporate.sanrio.co.jp/pdf/long-term-vision_mid-term-plan_management_update2025.pdf" },
    ],
  },

  {
    id: "toei-animation",
    no: 7,
    name: "東映アニメーション",
    nameEn: "Toei Animation",
    ticker: "4816",
    listing: "東証スタンダード上場",
    hq: "東京都中野区",
    positioning:
      "ONE PIECE / ドラゴンボール / プリキュア を擁する日本最大級のアニメ制作・IPホルダー。海外売上比率の高さが特徴。",
    tags: ["アニメ", "海外比率高", "長寿IP"],
    accent: "#e94f3c",
    gradient: ["#ff8c7a", "#6b1d12"],
    characters: [
      { name: "モンキー・D・ルフィ", glyph: "🏴‍☠️", tagline: "ONE PIECE 放送25年超、Netflix実写化も成功" },
      { name: "孫悟空", glyph: "🐲" },
    ],
    planName: "中期経営計画『VISION 2030』",
    planPeriod: "FY2027/3～FY2031/3 (5か年, 2025年10月29日発表)",
    pillars: [
      {
        title: "スタジオ — 制作キャパシティ拡張",
        detail:
          "アニメーター育成・3DCG/2Dハイブリッド技術への投資を継続。",
      },
      {
        title: "IP — 新規IP創出を加速",
        detail:
          "新規IP創出本数を過去5年の3倍 = 40作品 へ。既存大型IPに加え、新規IPを毎年計画的に立ち上げる体制。",
      },
      {
        title: "地域 — 海外現地化の徹底",
        detail:
          "東南アジア・中東 (ドバイ拠点) 展開、海外営業人員 300人体制、現地化率 30% を志向。",
      },
      {
        title: "顧客接点 — D2Cとデジタル",
        detail:
          "Netflix/Crunchyroll等との直接案件比率を高め、配信時代の収益捕捉力を強化。",
      },
    ],
    targets: [
      { label: "売上高 (FY2031/3)", value: "2,000億円", note: "FY2025/3比 約+98%" },
      { label: "営業利益", value: "500億円", note: "FY2025/3比 約+54%" },
      { label: "海外売上比率", value: "60%" },
      { label: "現地化率", value: "30%" },
      { label: "5年戦略投資総額", value: "約2,000億円", note: "作品制作700億、海外200億 等" },
    ],
    insights: [
      {
        headline: "『既にグローバル企業』である事実が再評価ポイント",
        body: "日本のアニメ企業の多くが海外比率を上げようとする中、東映アニメは既に海外比率が業界最高水準。VISION 2030 の論点は『海外で勝つか』ではなく『海外でどれだけ勝ち続けるか』。",
      },
      {
        headline: "IPの世代交代設計が秀逸",
        body: "プリキュアの毎年シリーズ刷新、ONE PIECE/DRAGON BALL の続編・派生作品で、IPの寿命を意図的に伸ばす設計。長寿アニメIP運営モデル。",
      },
      {
        headline: "制作キャパが最大の成長制約 — 新規IP 40作品が試金石",
        body: "需要過多に対し、アニメーター・スタジオ供給がボトルネック。新規IP本数3倍は野心的で、人材・スタジオ拡張が達成可否を決める。",
      },
    ],
    watch: [
      "ONE PIECE 実写シーズン2、新作劇場版",
      "DRAGON BALL DAIMA/新シリーズの海外売上",
      "ドバイ拠点と中東展開の進捗",
    ],
    sources: [
      { label: "東映アニメ VISION 2030", url: "https://corp.toei-anim.co.jp/ja/ir/management/strategy.html" },
      { label: "VISION 2030 説明資料 (2025/10/29)", url: "https://corp.toei-anim.co.jp/ja/ir/news/auto_20251029581026/pdfFile.pdf" },
    ],
  },

  {
    id: "toho",
    no: 8,
    name: "東宝",
    nameEn: "Toho",
    ticker: "9602",
    listing: "東証プライム上場",
    hq: "東京都千代田区",
    positioning:
      "ゴジラを核とするIP事業、邦画No.1配給+劇場、アニメ国際展開 (GKIDS買収) で多面化する日本映画の総合企業。",
    tags: ["映画", "アニメ国際展開", "ゴジラ"],
    accent: "#1f6feb",
    gradient: ["#6aa3ff", "#13335f"],
    characters: [
      { name: "ゴジラ", glyph: "🦖", tagline: "『ゴジラ-1.0』でアカデミー賞VFX受賞、海外興行が再加速" },
      { name: "新海誠監督作品 (配給)", glyph: "🎬" },
    ],
    planName: "中期経営計画2028 + 長期ビジョン2032",
    planPeriod: "FY2026/2～FY2028/2 (3か年, 2025年4月14日発表)",
    pillars: [
      {
        title: "人材",
        detail:
          "クリエイティブ人材確保とプロデューサー育成。",
      },
      {
        title: "コンテンツ・IP",
        detail:
          "知財/IP軸経営へのシフト。映画・演劇・不動産に加え、アニメーションを『第4の柱』化。",
      },
      {
        title: "デジタル",
        detail:
          "劇場のIMAX/Dolby/4DXなど高単価フォーマット、デジタルマーケティング、データ活用。",
      },
      {
        title: "海外",
        detail:
          "GKIDS (米国アニメ配給会社) 買収 (2024年公表) で北米配給網を内製化。海外売上比率を現在約10%→2032年に30%へ。",
      },
    ],
    targets: [
      { label: "営業利益 (FY2028/2)", value: "700億円以上" },
      { label: "長期 営業利益 (2032)", value: "750～1,000億円" },
      { label: "ROE (長期)", value: "10%以上" },
      { label: "海外売上比率 (2032)", value: "30%", note: "現在 約10%" },
      { label: "3年戦略投資枠", value: "1,000億円", note: "コンテンツ700億・ゴジラ150億・M&A等" },
      { label: "配当", value: "85円下限・配当性向35%以上" },
    ],
    insights: [
      {
        headline: "『-1.0』はゴジラ経済圏の転換点",
        body: "アカデミー賞VFX受賞と低予算高収益のヒットで、ゴジラIPの世界市場価値が再評価。次作の予算/座組設計が海外興行モデルの試金石。",
      },
      {
        headline: "GKIDS買収は『日本アニメの北米配給を取りに行く』宣言",
        body: "ジブリ作品の北米配給で培われた GKIDS の流通網を内製化する動きは、東宝の海外IP事業の構造変化。日本アニメ全体の海外興行収益捕捉率を引き上げる起点。",
      },
      {
        headline: "ストック型と興行型のバランスを意識した投資配分",
        body: "劇場・映画配給は興行依存 (高ボラ)、IPロイヤリティはストック型 (安定)。1,000億円の戦略投資枠の配分内訳が、東宝の経営姿勢を示す。",
      },
    ],
    watch: [
      "新作ゴジラ作品の予算/制作座組と公開時期",
      "GKIDS 経由の北米アニメ興行成績",
      "帝国劇場再開後の演劇事業 収益寄与",
    ],
    sources: [
      { label: "東宝 経営理念", url: "https://www.toho.co.jp/company/info/philosophy" },
      { label: "中期経営計画2028 適時開示", url: "https://www.fse.or.jp/files/lis_tkj/250414960211.pdf" },
    ],
  },

  {
    id: "kadokawa",
    no: 9,
    name: "KADOKAWA",
    nameEn: "KADOKAWA",
    ticker: "9468",
    listing: "東証プライム上場",
    hq: "東京都千代田区",
    positioning:
      "出版/アニメ/ゲーム/教育の総合IPメディア企業。ソニーグループとの資本業務提携でIP国際展開を加速。",
    tags: ["出版", "アニメ", "IP製造業", "ソニー連合"],
    accent: "#27c4a1",
    gradient: ["#5cf0c8", "#0d4a3d"],
    characters: [
      { name: "葬送のフリーレン／推しの子 等", glyph: "📖", tagline: "ライトノベル/コミック発のメディアミックスIP" },
      { name: "エルデンリング (フロム・ソフトウェア)", glyph: "⚔️" },
    ],
    planName: "中期経営計画『Global Media Mix with Technology』",
    planPeriod: "FY2024/3～FY2028/3 (5か年, 2023年11月発表)",
    pillars: [
      {
        title: "IP創出拡大",
        detail:
          "ライトノベル/Web小説/コミックから IPを大量に生み出すパイプライン。最終年度 年間 7,000タイトル創出を志向。",
      },
      {
        title: "メディアミックスでの事業連携強化",
        detail:
          "出版→アニメ→ゲーム→実写の社内/グループ内パイプラインを回す。",
      },
      {
        title: "IP LTV最大化 (グローバル展開)",
        detail:
          "ソニーグループとの資本業務提携 (2024年公表) で、アニメ/音楽/映像のグローバル配給を補完。",
      },
      {
        title: "出版DX (製造・物流のデジタル化)",
        detail:
          "ところざわサクラタウンを起点とした物流DX。",
      },
      {
        title: "アニメ内製化",
        detail:
          "自社アニメ制作を 年5作品 → 20作品 へ拡大。",
      },
    ],
    targets: [
      { label: "売上高 (FY2028/3)", value: "3,400億円", note: "うち海外 700億円" },
      { label: "営業利益", value: "340億円" },
      { label: "ROE", value: "12%以上" },
      { label: "IP創出 (最終年度)", value: "年間 7,000タイトル" },
      { label: "アニメ内製化", value: "年5作品 → 20作品" },
    ],
    insights: [
      {
        headline: "『IPの工場』を持つことの強さ",
        body: "ライトノベル → アニメ → ゲーム → 映像の社内/グループ内パイプラインを持つ唯一の規模感。新規IP供給の継続性が、競合に対する持続的優位。",
      },
      {
        headline: "ソニーとの提携はディストリビューション補完",
        body: "KADOKAWAのIP製造力 × ソニーグループの世界配給網 (Crunchyroll、SME、SPE) で、海外で取れていなかった利益を取りに行く構造。日本IPの海外売上比率引き上げの最有力ストーリー。",
      },
      {
        headline: "教育 (N高/S高) が第3の柱として独立採算化",
        body: "N高/S高はトップライン拡大局面。出版・映像と独立性が高く、景気耐性のあるリカーリング事業として中計の柱に。",
      },
    ],
    watch: [
      "ソニー提携の具体案件公表",
      "アニメ制作スタジオ買収/出資の継続",
      "N高/S高の生徒数とARPU",
    ],
    sources: [
      { label: "KADOKAWA 中期経営計画", url: "https://group.kadokawa.co.jp/ir/plan.html" },
      { label: "中期経営計画資料", url: "https://group.kadokawa.co.jp/ir/media-download/1020/cbc6293625c5027c/" },
    ],
  },

  {
    id: "konami",
    no: 10,
    name: "コナミグループ",
    nameEn: "Konami Group",
    ticker: "9766",
    listing: "東証プライム上場",
    hq: "東京都中央区",
    positioning:
      "遊戯王/eFootball/桃鉄/メタルギア/サイレントヒル等のIPと、健康サービス・ゲーミング機器の多角企業。",
    tags: ["ゲーム", "TCG", "デジタル"],
    accent: "#e5151a",
    gradient: ["#ff6b6e", "#6b0509"],
    characters: [
      { name: "武藤遊戯 (遊戯王)", glyph: "🃏", tagline: "TCGとデジタル両輪のメガIP" },
      { name: "桃太郎電鉄／メタルギア／eFootball", glyph: "🚂" },
    ],
    planName: "中長期定量目標は非開示方針",
    planPeriod: "通期業績ガイダンスと方針説明で代替",
    pillars: [
      {
        title: "デジタルエンタテインメントへの集中",
        detail:
          "家庭用/モバイルゲームのデジタル比率を最大化。遊戯王 マスターデュエル等の継続課金型IPに資源集中。",
      },
      {
        title: "IPリブートと長期運営",
        detail:
          "メタルギアソリッド Δ、サイレントヒル等の旧IP復活で休眠資産を再収益化。",
      },
      {
        title: "TCG (遊戯王) のグローバル収益化",
        detail:
          "紙のTCG (物販) と マスターデュエル (デジタル課金) の両輪。世界TCG市場での地位を維持。",
      },
      {
        title: "スポーツ/健康事業",
        detail:
          "スポーツクラブ・健康サービスを生活密着リカーリング事業として運営。",
      },
    ],
    targets: [
      {
        label: "中長期定量目標",
        value: "非開示方針",
        note: "『市場変化が早く誤った投資判断を招くおそれがある』として中長期数値目標は開示しない。",
      },
      { label: "FY2025/3 実績 売上高", value: "4,216億円" },
      { label: "FY2025/3 実績 事業利益", value: "1,091億円 (過去最高)" },
    ],
    insights: [
      {
        headline: "中長期数値目標を出さない開示ポリシー",
        body: "任天堂と同様、中期経営計画の数値目標を出さない方針を明示。投資家コミュニケーションでは賛否あるが、ヒット依存のエンタメ業界の現実を反映した姿勢。",
      },
      {
        headline: "『休眠IPの再起動』が最も上手い",
        body: "メタルギアΔ、サイレントヒル、悪魔城、桃鉄など、長期休眠IPを現代のグラフィックス/プラットフォームで再起動する手腕は業界随一。IPカタログの『棚卸し→再投資』が組織機能として確立。",
      },
      {
        headline: "ゲーム以外の事業セグメントが緩衝材",
        body: "ゲーム以外 (スポーツ・ゲーミング機器) が一定の利益ベースを作るため、ヒット作不在の年でも下方ボラが小さい構造。",
      },
    ],
    watch: [
      "メタルギアソリッド Δ の評価/実売",
      "遊戯王 マスターデュエル ARPU/MAU",
      "新作モバイル/コンシューマー発表",
    ],
    sources: [
      { label: "コナミグループ IR", url: "https://www.konami.com/ir/ja/" },
    ],
  },

  {
    id: "sony",
    no: 11,
    name: "ソニーグループ",
    nameEn: "Sony Group",
    ticker: "6758",
    listing: "東証プライム上場",
    hq: "東京都港区",
    positioning:
      "ゲーム/音楽/映画/アニメ流通 (Crunchyroll) の世界最大級エンタメコングロマリット。",
    tags: ["ゲーム", "音楽", "映画", "アニメ流通"],
    accent: "#0aaeff",
    gradient: ["#5fd3ff", "#093e6e"],
    characters: [
      { name: "The Last of Us / Ghost of Tsushima", glyph: "🕷️", tagline: "Ghost of Tsushima は2027年アニメ化予定" },
      { name: "スパイダーマン (Sony Pictures × Insomniac)", glyph: "🕸️" },
    ],
    planName: "第五次中期経営計画『境界を超える ～グループ全体のシナジー最大化～』",
    planPeriod: "FY2024/3～FY2026/3 (3か年)",
    pillars: [
      {
        title: "IP価値最大化とそれを支える技術基盤の確立",
        detail:
          "長期ビジョン『Creative Entertainment Vision』のもと、IPを中心軸に。",
      },
      {
        title: "ワンIP多面展開",
        detail:
          "ゲーム・アニメ・映画・音楽・イベントへの横展開。ゲームIPの実写映像化を10作品以上制作中。",
      },
      {
        title: "PSNプラットフォーム強化",
        detail:
          "PlayStation Network を軸にコミュニティ/サブスク/モバイル/PC展開を加速。",
      },
      {
        title: "Crunchyroll中心のアニメ事業グローバル展開",
        detail:
          "Crunchyroll 有料会員 1,700万人超。KADOKAWAとの世界展開連携。AI制作ツール『AnimeCanvas』導入。",
      },
    ],
    targets: [
      { label: "金融除く連結営業利益 CAGR", value: "10%以上" },
      { label: "3か年累計 営業利益率", value: "10%以上" },
      { label: "設備投資 3年累計", value: "1.7兆円" },
      { label: "戦略投資 + 機動的自己株式取得", value: "公表" },
    ],
    insights: [
      {
        headline: "『日本IPの世界マネタイズ最大のプラットフォーム』",
        body: "Crunchyroll (アニメ配信)、Aniplex (製作出資/グッズ)、SME (音楽)、SPE (実写化) で日本IPを世界で収益化する経路を最も保有。KADOKAWAとの提携も同じ文脈。",
      },
      {
        headline: "ゲームIPの実写映像化10作品以上 — IP複利の本気",
        body: "The Last of Us (HBO ヒット) を起点に、PlayStation スタジオ作品の実写化を10作品以上同時推進。ハードからソフトIPへ収益の重心を移す戦略意思の表れ。",
      },
      {
        headline: "半導体 (イメージング) が中計投資の原資",
        body: "イメージング・センシングの利益動向がエンタメ投資余力を規定する企業構造。長期的にハード利益からエンタメIPへ利益の重心が移行。",
      },
    ],
    watch: [
      "PlayStation 後継機 戦略",
      "Crunchyroll の MAU/ARPU と日本IPの海外売上",
      "Ghost of Tsushima アニメ化 (2027年) の動向",
    ],
    sources: [
      { label: "ソニーグループ IR", url: "https://www.sony.com/ja/SonyInfo/IR/" },
      { label: "経営方針説明会", url: "https://www.sony.com/ja/SonyInfo/IR/library/presen.html" },
    ],
  },

  {
    id: "oriental-land",
    no: 12,
    name: "オリエンタルランド",
    nameEn: "Oriental Land",
    ticker: "4661",
    listing: "東証プライム上場",
    hq: "千葉県浦安市",
    positioning:
      "東京ディズニーリゾートを運営。Disney IP のローカルライセンシーとして、世界のテーマパーク経営の最有力比較対象。",
    tags: ["テーマパーク", "高付加価値化", "Disney"],
    accent: "#0e6dc2",
    gradient: ["#5aa9ee", "#08365f"],
    characters: [
      { name: "ミッキーマウス (東京ディズニー運営)", glyph: "🐭", tagline: "Disneyとのライセンス契約に基づく日本独占運営" },
    ],
    planName: "長期経営戦略 (2025年5月発表) + 旧2024中期経営計画",
    planPeriod: "～2035年度を見据えた長期戦略",
    pillars: [
      {
        title: "ファンタジースプリングス (2024年6月開業) の単価最大化",
        detail:
          "投資額 約3,200億円の新エリア開業を起点に、ディズニープレミアアクセス等で来園単価を継続上昇。",
      },
      {
        title: "レベニューマネジメントによる収入最大化",
        detail:
          "入園者数の最大化から ARPV (ゲスト一人当たり売上) 最大化に KPI を意識的にシフト。",
      },
      {
        title: "クルーズ事業参入 (2024年7月発表)",
        detail:
          "テーマパーク隣接ホテル/クルーズ船で IP 体験の幅を拡大。就航数年後 営業利益率 20%台後半を目標。",
      },
      {
        title: "デジタル投資による体験価値向上",
        detail:
          "アプリ、QR、予約システムでオペレーションを最適化。",
      },
    ],
    targets: [
      { label: "売上高 (2035年度)", value: "1兆円以上 (長期ビジョン)" },
      { label: "旧FY2024/3 営業利益 実績", value: "1,467億円", note: "計画1,000億円以上を大幅超過" },
      { label: "ROE 実績 (FY2024)", value: "12.7%", note: "計画8%以上を大幅超過" },
      { label: "クルーズ事業 利益率目標", value: "営業利益率 20%台後半 (就航数年後)" },
    ],
    insights: [
      {
        headline: "『入園者数』KPIから『単価』KPIへの転換",
        body: "国内人口減少と稼働制約を踏まえ、人を増やすより1人あたり売上を上げる戦略へ。プレミアアクセス、レストランの予約制、限定グッズで段階的単価上昇を実現。",
      },
      {
        headline: "クルーズは『陸上テーマパークの寿命延長戦略』",
        body: "クルーズ船は新規体験商品であると同時に、来園客の海外/インバウンドへの拡張装置。固定地ベースの限界を超える試み。日本のレジャー企業として極めて稀な戦略選択。",
      },
      {
        headline: "Disney IP 依存はリスクであり堀でもある",
        body: "ライセンス契約に依存する一方、世界最強IPの独占運営権は持続的競争優位。次の契約更新条件と新規IP導入 (マーベル/スター・ウォーズ) の動向が注目。",
      },
    ],
    watch: [
      "ファンタジースプリングス開業効果のフル年度寄与",
      "東京ディズニークルーズ 船建造・公開情報",
      "ディズニープレミアアクセスの売上・利益率",
    ],
    sources: [
      { label: "オリエンタルランド 経営計画", url: "https://www.olc.co.jp/ja/ir/management/plan.html" },
      { label: "オリエンタルランド IR", url: "https://www.olc.co.jp/ja/ir.html" },
    ],
  },

  {
    id: "takara-tomy",
    no: 13,
    name: "タカラトミー",
    nameEn: "Takara Tomy",
    ticker: "7867",
    listing: "東証プライム上場",
    hq: "東京都葛飾区",
    positioning:
      "トミカ/プラレール/リカちゃん/BEYBLADE/ガチャの老舗トイIPと、ライセンス事業 (ポケモン等) で構成。",
    tags: ["玩具", "IPライセンシー", "海外展開"],
    accent: "#f8a017",
    gradient: ["#ffce72", "#7a4e02"],
    characters: [
      { name: "トミカ", glyph: "🚗", tagline: "1970年発売、累計販売台数10億台超" },
      { name: "リカちゃん／プラレール／BEYBLADE", glyph: "👧" },
    ],
    planName: "中期経営戦略2030 + Business Vision 2030",
    planPeriod: "～FY2030/3 (2024年5月公表)",
    pillars: [
      {
        title: "主力IPの価値向上",
        detail:
          "トミカ、プラレール、リカちゃん、BEYBLADE、ガチャ — カテゴリごとに圧倒的シェアを取るリーダー戦略。",
      },
      {
        title: "ファンコミュニティ構築",
        detail:
          "幅広い年齢層 (キダルト=大人ファン層) に向けた展開、地域別ファンイベント。",
      },
      {
        title: "海外展開強化",
        detail:
          "上海TOMICA BRAND STORE等の旗艦店展開。北米/アジアでの直販強化。",
      },
      {
        title: "知財保護徹底",
        detail:
          "海賊版対策と海外でのIPホルダー保護。",
      },
    ],
    targets: [
      { label: "売上高 (FY2030/3)", value: "3,000億円" },
      { label: "営業利益", value: "300億円" },
      { label: "ROE", value: "11%以上 継続" },
      { label: "FY2025/3 実績 ROE", value: "15.8% (計画超過)" },
    ],
    insights: [
      {
        headline: "『カテゴリリーダー戦略』の典型",
        body: "ミニカー(トミカ)、鉄道玩具(プラレール)、人形(リカちゃん)、コマ玩具(BEYBLADE)等、カテゴリごとに圧倒的シェアを取る積み上げ戦略。ロングテール型IPホルダーのモデル。",
      },
      {
        headline: "中国市場での旗艦店展開がグロース・ドライバー",
        body: "上海のTOMICA旗艦店等、ローカル拠点でブランド体験を提供する戦略は、日本玩具IP海外展開のセオリーを再現。",
      },
      {
        headline: "ポケモンTCG/玩具のライセンシー収益はボラが高い",
        body: "ポケモンTCG世界ブームの恩恵を大きく受ける一方、ブームの波で業績が動く。自社IPと比較した利益質の差は中期論点。",
      },
    ],
    watch: [
      "BEYBLADE Xの海外実売",
      "ポケモンライセンス商品の継続成長",
      "中国/ASEANの旗艦店出店ペース",
    ],
    sources: [
      { label: "タカラトミー 中期経営戦略2030", url: "https://www.takaratomy.co.jp/ir/plan/" },
      { label: "タカラトミー IR", url: "https://www.takaratomy.co.jp/ir/" },
    ],
  },

  {
    id: "bushiroad",
    no: 14,
    name: "ブシロード",
    nameEn: "Bushiroad",
    ticker: "7803",
    listing: "東証グロース上場",
    hq: "東京都中野区",
    positioning:
      "TCG (カードファイト!! ヴァンガード等) + ライブエンタメ (バンドリ!) + プロレス (新日本プロレス) の異色IP複合企業。",
    tags: ["TCG", "ライブ", "プロレス"],
    accent: "#9333ea",
    gradient: ["#c084fc", "#3b1166"],
    characters: [
      { name: "BanG Dream! (バンドリ!)", glyph: "🎸", tagline: "音楽×ゲーム×ライブのメディアミックスIP" },
      { name: "新日本プロレス／カードファイト!! ヴァンガード", glyph: "🤼" },
    ],
    planName: "中期ビジョン2030 (2025年策定)",
    planPeriod: "～2030年度",
    pillars: [
      {
        title: "ライブミックスエンタテインメントとグローバルスケール加速",
        detail:
          "TCG・音楽・ゲーム・プロレスを統合したライブ体験事業をグローバルに拡大。",
      },
      {
        title: "自社IPの活性化および新規IP創出",
        detail:
          "バンドリ! 依存からの脱却を目的に、新規IPの計画的立ち上げを継続。",
      },
      {
        title: "祖業TCGビジネスのリスタート",
        detail:
          "メガパブリッシャー化を目指し、TCG事業を再強化。",
      },
      {
        title: "海外重点地域: 東アジア・北米",
        detail:
          "国内:海外売上比率を 50:50 まで引き上げる。",
      },
    ],
    targets: [
      { label: "売上高 (2030年度)", value: "1,000～1,200億円" },
      { label: "営業利益", value: "120～150億円" },
      { label: "国内:海外売上比率", value: "50:50" },
      {
        label: "旧 中期経営計画2027",
        value: "数値目標取下げ (2024年8月13日)",
        note: "デジタルコンテンツの計画と実績の乖離が要因。",
      },
    ],
    insights: [
      {
        headline: "中計を一度取り下げた経緯が論点",
        body: "2023年8月公表の中計2027 (売上1,000億円/営業利益133億円) を2024年8月に取り下げた経緯がある。新ビジョン2030は同等規模を一年後ろにずらした形で、達成可能性の再証明がテーマ。",
      },
      {
        headline: "『TCG×プロレス×ライブ』の異種混合経営",
        body: "一般には交わらない事業群を組み合わせ、ファン経済圏の交差で稼ぐ独特のモデル。各事業の収益質 (フロー/ストック) の組合せでヘッジ効果を生む。",
      },
      {
        headline: "新日本プロレスの海外グロースが鍵",
        body: "国内プロレス市場は飽和。米国 (NJPW STRONG)・英国での会場興行と配信プラットフォームNJPW WORLDが中期の主成長エンジン。",
      },
    ],
    watch: [
      "新日本プロレスの海外興行/PPV",
      "バンドリ! 新シリーズの反応",
      "TCG事業のシェア回復進捗",
    ],
    sources: [
      { label: "ブシロード 中期ビジョン", url: "https://bushiroad.co.jp/ir/vision" },
      { label: "ブシロード IR", url: "https://bushiroad.com/ir/" },
    ],
  },

  {
    id: "cyberagent",
    no: 15,
    name: "サイバーエージェント (Cygames含む)",
    nameEn: "CyberAgent (incl. Cygames)",
    ticker: "4751",
    listing: "東証プライム上場",
    hq: "東京都渋谷区",
    positioning:
      "Cygames (連結子会社) の『ウマ娘』『グラブル』を擁するゲーム事業 + ABEMA + 広告事業の3本柱。",
    tags: ["ゲーム", "メディア", "AI"],
    accent: "#16c47e",
    gradient: ["#5cf0aa", "#0a4d34"],
    characters: [
      { name: "ウマ娘 プリティーダービー", glyph: "🏇", tagline: "英語版Steamセールス1位、海外売上 前年同期比 6倍" },
      { name: "グランブルーファンタジー (Granblue Fantasy: Relink)", glyph: "🐉" },
    ],
    planName: "成長戦略 (独立した中期経営計画は公開情報からは不明)",
    planPeriod: "会計年度ベースの成長戦略開示が中心",
    pillars: [
      {
        title: "インターネット広告事業の継続成長",
        detail:
          "極予測AIなど自社AI技術の広告クリエイティブ自動生成を内製化。",
      },
      {
        title: "ゲーム事業 (SGE 5,000名超 + Cygames) のオリジナルIP海外展開",
        detail:
          "ウマ娘 グローバル版 (英語版Steam 1位)、Granblue Fantasy: Relinkで海外展開を本格化。",
      },
      {
        title: "ABEMAの黒字転換と『メディア&IP』事業化",
        detail:
          "FIFA W杯独占配信で築いた認知を起点に、有料会員/広告売上の積み上げ。",
      },
      {
        title: "短期収益性と中長期成長機会のバランス",
        detail:
          "広告のキャッシュでゲーム/メディアの先行投資を支える3脚構造。",
      },
    ],
    targets: [
      {
        label: "中期数値目標",
        value: "独立した中計の公開情報からは不明",
        note: "通期実績/年次経営方針で代替",
      },
      { label: "FY2025 売上高 実績", value: "8,740億円", note: "広告51%/ゲーム24%/メディア&IP 25%" },
      { label: "FY2024 (9月期) 営業利益 実績", value: "418億円 (前年比 70%増)" },
      { label: "ウマ娘 海外売上", value: "前年同期比 約6倍 (200億円規模)" },
    ],
    insights: [
      {
        headline: "『広告 + ゲーム + メディア』の三脚椅子経営",
        body: "広告の安定キャッシュで、ゲームのヒット待ちボラ、ABEMAの投資先行を支える設計。3事業のフェーズ差を組み合わせて成長を継続。",
      },
      {
        headline: "Cygames ウマ娘は『日本発IPの海外展開』テストケース",
        body: "国内大ヒットIPの海外展開で、ローカライズ・運営・コラボ設計のノウハウを蓄積中。英語版Steamセールス1位は、日本ゲームIPの海外展開モデルとなる象徴的事例。",
      },
      {
        headline: "AI内製は広告業界の競争力規定要因",
        body: "極予測AI等で広告クリエイティブの生成・最適化を内製化し、外部AIベンダーへの依存を回避。利益率防衛の典型例。",
      },
    ],
    watch: [
      "ウマ娘 グローバル版の課金成績の継続性",
      "ABEMA の四半期営業損益 (黒字化転換)",
      "Granblue Fantasy: Relink 続編/関連作品",
    ],
    sources: [
      { label: "サイバーエージェント IR", url: "https://www.cyberagent.co.jp/ir/" },
      { label: "投資家資料", url: "https://www.cyberagent.co.jp/files/topics/20015_ext_21_0.pdf" },
    ],
  },
];

export function getCompany(id: string) {
  return COMPANIES.find((c) => c.id === id);
}

export function allTags(): string[] {
  const s = new Set<string>();
  for (const c of COMPANIES) for (const t of c.tags) s.add(t);
  return Array.from(s).sort();
}
