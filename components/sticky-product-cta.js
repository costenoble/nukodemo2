"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/lib/format";

export function StickyProductCTA({ product }) {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("product");

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-outline bg-background/95 backdrop-blur-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="page-shell flex items-center justify-between gap-4 py-4">
        <div className="hidden sm:block">
          <p className="font-headline text-xl font-bold tracking-[-0.04em]">{product.name}</p>
          <p className="text-xs text-on-surface-muted">{t("stickyDelivery")}</p>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <p className="font-headline text-2xl font-bold tracking-[-0.05em]">{formatPrice(product.preorderPrice)}</p>
            <p className="text-xs text-on-surface-muted line-through">{formatPrice(product.price)}</p>
          </div>
          <Link className="button-primary" href={`/precommande?model=${product.id}`}>
            {t("stickyPreorder")}
          </Link>
        </div>
      </div>
    </div>
  );
}
