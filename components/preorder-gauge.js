"use client";

import { useTranslations } from "next-intl";

export function PreorderGauge({ reserved = 84, total = 100, compact = false }) {
  const t = useTranslations("gauge");
  const pct = Math.min(100, Math.round((reserved / total) * 100));
  const remaining = total - reserved;

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-2 text-sm">
          <span className="font-bold text-on-surface">
            {reserved} / {total} {t("reserved")}
          </span>
          <span className="text-on-surface-muted">{remaining} {t("remaining")}</span>
        </div>
        <div className="h-1 w-full overflow-hidden bg-outline">
          <div
            className="h-full bg-primary transition-all duration-1000"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-on-surface-muted">{t("launchMessage")}</p>
      </div>
    );
  }

  return (
    <div className="border border-outline bg-background p-7">
      <p className="eyebrow mb-5">{t("eyebrow")}</p>
      <div className="flex items-baseline gap-2">
        <span className="font-headline text-5xl font-bold tracking-[-0.07em]">{reserved}</span>
        <span className="text-on-surface-muted">/ {total}</span>
        <span className="ml-1 text-sm text-on-surface-muted">{t("reserved")}</span>
      </div>
      <div className="relative mt-4 h-2 w-full overflow-hidden bg-surface-muted">
        <div
          className="absolute inset-y-0 left-0 bg-primary transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-on-surface-muted">
        <span>{pct}% {t("filled")}</span>
        <span className="font-medium text-on-surface">{remaining} {t("remaining")}</span>
      </div>
      <p className="mt-4 text-sm leading-7 text-on-surface-muted">{t("launchMessage")}</p>
    </div>
  );
}

export function PreorderGaugeLight({ reserved = 84, total = 100 }) {
  const t = useTranslations("gauge");
  const pct = Math.min(100, Math.round((reserved / total) * 100));
  const remaining = total - reserved;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="font-bold text-on-surface">
          {reserved} / {total} {t("reserved")}
        </span>
        <span className="text-on-surface-muted">{remaining} {t("remaining")}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden bg-outline">
        <div
          className="h-full bg-primary transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-on-surface-muted">{t("launchMessage")}</p>
    </div>
  );
}
