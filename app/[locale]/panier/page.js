import { setRequestLocale } from "next-intl/server";

import { CartPage } from "@/components/cart-page";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: locale === "en" ? "Cart | NUKÖ" : "Panier | NUKÖ" };
}

export default async function PanierPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CartPage />;
}
