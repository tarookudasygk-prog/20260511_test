type Props = { status: string };

const STYLE: Record<string, { bg: string; fg: string; label: string }> = {
  "蔵書あり": { bg: "#e6f4ea", fg: "#2c6b3b", label: "蔵書あり" },
  "貸出可": { bg: "#e6f4ea", fg: "#2c6b3b", label: "貸出可" },
  "貸出中": { bg: "#fde9d9", fg: "#a64a14", label: "貸出中" },
  "予約多数": { bg: "#fdecec", fg: "#a13030", label: "予約多数" },
  "館外": { bg: "#fff3cd", fg: "#8a6516", label: "館外" },
  "館内のみ": { bg: "#e8eef9", fg: "#2a4d8a", label: "館内のみ" },
  "貸出不可": { bg: "#f3e8e8", fg: "#7a3a3a", label: "貸出不可" },
  "蔵書なし": { bg: "#f1eee8", fg: "#7a6d5e", label: "蔵書なし" },
};

export function StatusBadge({ status }: Props) {
  const s = STYLE[status] || { bg: "#f1eee8", fg: "#5a4f43", label: status || "—" };
  return (
    <span
      style={{ background: s.bg, color: s.fg }}
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold whitespace-nowrap"
    >
      {s.label}
    </span>
  );
}
