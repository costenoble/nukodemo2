import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

import { allProducts } from "@/lib/products";

export async function generateStaticParams() {
  return allProducts.flatMap((p) =>
    ["fr", "en"].map((locale) => ({ locale, slug: p.slug }))
  );
}

export default async function BoutiqueSlugPage({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  redirect(`/produit/${slug}`);
}
