export function Marquee({ text, repeat = 8 }) {
  const items = Array.from({ length: repeat }, (_, i) => (
    <span key={i} className="shrink-0 pr-10">
      {text}
    </span>
  ));

  return (
    <div className="overflow-hidden border-y border-outline bg-surface-muted py-3.5">
      <div className="marquee-track flex whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-muted">
        <div className="marquee-inner flex shrink-0" aria-hidden="true">{items}</div>
        <div className="marquee-inner flex shrink-0">{items}</div>
      </div>
    </div>
  );
}
