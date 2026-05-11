"use client";

import { CartProvider } from "@/components/cart-provider";
import { MotionProvider } from "@/components/motion-provider";
import { PageTransitionProvider } from "@/components/page-transition";
import { SiteHeader } from "@/components/site-header";

export function AppShell({ children }) {
  return (
    <CartProvider>
      <PageTransitionProvider>
        <div className="min-h-screen bg-background">
          <SiteHeader />
          <MotionProvider>
            <div>{children}</div>
          </MotionProvider>
        </div>
      </PageTransitionProvider>
    </CartProvider>
  );
}
