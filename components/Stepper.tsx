type Props = {
  current: 1 | 2 | 3;
  bookDone: boolean;
  libDone: boolean;
  onJump: (step: 1 | 2 | 3) => void;
};

const STEPS = [
  { n: 1 as const, label: "書籍を選ぶ" },
  { n: 2 as const, label: "図書館を選ぶ" },
  { n: 3 as const, label: "蔵書状況を見る" },
];

export function Stepper({ current, bookDone, libDone, onJump }: Props) {
  function canJump(n: 1 | 2 | 3) {
    if (n === 1) return true;
    if (n === 2) return bookDone;
    return bookDone && libDone;
  }

  return (
    <ol className="flex flex-wrap items-center gap-2 text-sm">
      {STEPS.map((s, i) => {
        const active = current === s.n;
        const done =
          (s.n === 1 && bookDone) || (s.n === 2 && libDone) || (s.n === 3 && current === 3);
        const clickable = canJump(s.n);
        return (
          <li key={s.n} className="flex items-center gap-2">
            <button
              onClick={() => clickable && onJump(s.n)}
              disabled={!clickable}
              className={[
                "flex items-center gap-2 rounded-full border px-3 py-1.5 transition",
                active
                  ? "border-brand-500 bg-brand-500 text-paper-50"
                  : done
                  ? "border-brand-200 bg-brand-50 text-brand-600"
                  : "border-paper-300 bg-white text-ink-500",
                clickable && !active ? "hover:border-brand-400" : "",
                !clickable ? "opacity-60" : "",
              ].join(" ")}
            >
              <span
                className={[
                  "inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold",
                  active
                    ? "bg-paper-50 text-brand-600"
                    : done
                    ? "bg-brand-500 text-paper-50"
                    : "bg-paper-100 text-ink-500",
                ].join(" ")}
              >
                {done && !active ? "✓" : s.n}
              </span>
              <span className="font-medium">{s.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <span className="text-paper-300">›</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
