"use client";

import { CartProvider } from "@/components/cart-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { MotionProvider } from "@/components/motion-provider";
import { PageTransitionProvider } from "@/components/page-transition";
import { SiteHeader } from "@/components/site-header";
import { ToastProvider } from "@/components/toast";

export function AppShell({ children }) {
  return (
    <CartProvider>
      <ToastProvider>
        <PageTransitionProvider>
          <CustomCursor />
          <div className="min-h-screen bg-background">
            <SiteHeader />
            <MotionProvider>
              <div>{children}</div>
            </MotionProvider>
          </div>
        </PageTransitionProvider>
      </ToastProvider>
    </CartProvider>
  );
}
