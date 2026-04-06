"use client";

import { CartProvider } from "@/components/cart-provider";
import { MotionProvider } from "@/components/motion-provider";
import { SiteHeader } from "@/components/site-header";

export function AppShell({ children }) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <MotionProvider>
          <div className="pt-24">{children}</div>
        </MotionProvider>
      </div>
    </CartProvider>
  );
}
