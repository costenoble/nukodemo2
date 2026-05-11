"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function extractNum(str) {
  const m = str.match(/^(.*?)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!m) return null;
  return { prefix: m[1], num: parseFloat(m[2].replace(",", ".")), suffix: m[3] };
}

export function AnimatedStat({ label, value }) {
  const ref = useRef(null);
  const hasRun = useRef(false);
  const [display, setDisplay] = useState(value);
  const parsed = useMemo(() => extractNum(value), [value]);

  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;
        observer.disconnect();

        const { prefix, num, suffix } = parsed;
        const duration = 1100;
        const start = performance.now();

        function tick(now) {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          const cur = Math.round(num * ease);
          setDisplay(`${prefix}${cur}${suffix}`);
          if (t < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [parsed]);

  return (
    <div ref={ref} className="bg-background p-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-on-surface-muted">{label}</p>
      <p className="mt-1.5 font-headline text-3xl font-bold tracking-[-0.05em]">{display}</p>
    </div>
  );
}
