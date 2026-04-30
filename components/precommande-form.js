"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { formatPrice } from "@/lib/format";
import { allProducts } from "@/lib/products";

const initialValues = {
  productId: "nomad-01",
  quantity: 1,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "France",
  message: ""
};

export function PrecommandeForm() {
  const params = useSearchParams();
  const modelParam = params.get("model");
  const validId = allProducts.find((p) => p.id === modelParam)?.id ?? "nomad-01";
  const [values, setValues] = useState({ ...initialValues, productId: validId });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState("");

  function update(key, val) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  const selectedProduct = allProducts.find((p) => p.id === values.productId) ?? allProducts[0];
  const totalPrice = selectedProduct.preorderPrice * values.quantity;

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/precommande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de la réservation.");
      setConfirmation(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div className="space-y-8 text-center">
        <div className="surface-panel p-10">
          <p className="eyebrow mb-4">Réservation confirmée</p>
          <h2 className="font-headline text-4xl font-bold tracking-[-0.05em]">
            Votre place est réservée
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-on-surface-muted">
            Référence : <strong>{confirmation.orderRef}</strong>
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-on-surface-muted">
            Vous venez de recevoir un email à <strong>{values.email}</strong> avec
            les instructions de paiement par virement bancaire.
            Votre réservation sera confirmée dès réception du règlement.
          </p>
          <div className="mx-auto mt-6 max-w-sm border border-outline bg-surface-muted p-5 text-left text-sm">
            <p className="eyebrow mb-3">Récapitulatif</p>
            <p><strong>{selectedProduct.name}</strong> × {values.quantity}</p>
            <p className="mt-1 text-on-surface-muted">{selectedProduct.deliveryLabel}</p>
            <p className="mt-3 font-headline text-2xl font-bold tracking-[-0.04em]">
              {formatPrice(totalPrice)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      {/* Choix produit */}
      <div className="space-y-4">
        <p className="eyebrow">Choisissez votre modèle</p>
        <div className="grid gap-4 md:grid-cols-2">
          {allProducts.map((product) => (
            <button
              key={product.id}
              className={`flex flex-col border p-6 text-left transition-all duration-200 ${
                values.productId === product.id
                  ? "border-primary bg-primary text-white"
                  : "border-outline bg-background hover:border-primary"
              }`}
              onClick={() => update("productId", product.id)}
              type="button"
            >
              <span className={`text-[10px] font-bold uppercase tracking-[0.16em] ${values.productId === product.id ? "text-white/70" : "text-on-surface-muted"}`}>
                {product.category}
              </span>
              <span className="mt-2 font-headline text-3xl font-bold tracking-[-0.05em]">
                {product.name}
              </span>
              <span className={`mt-1 text-sm ${values.productId === product.id ? "text-white/70" : "text-on-surface-muted"}`}>
                {product.subtitle}
              </span>
              <div className="mt-4 flex items-end gap-2">
                <span className="font-headline text-2xl font-bold tracking-[-0.04em]">
                  {formatPrice(product.preorderPrice)}
                </span>
                <span className={`pb-0.5 text-xs line-through ${values.productId === product.id ? "text-white/50" : "text-on-surface-muted"}`}>
                  {formatPrice(product.price)}
                </span>
              </div>
              <span className={`mt-1 text-xs ${values.productId === product.id ? "text-white/70" : "text-on-surface-muted"}`}>
                {product.deliveryLabel}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <label className="eyebrow" htmlFor="qty">Quantité</label>
          <div className="flex items-center border border-outline">
            <button
              className="px-5 py-3 font-bold"
              onClick={() => update("quantity", Math.max(1, values.quantity - 1))}
              type="button"
            >-</button>
            <input
              className="w-14 border-x border-outline bg-background py-3 text-center font-headline text-lg font-bold"
              id="qty"
              min={1}
              onChange={(e) => update("quantity", Math.max(1, parseInt(e.target.value) || 1))}
              type="number"
              value={values.quantity}
            />
            <button
              className="px-5 py-3 font-bold"
              onClick={() => update("quantity", values.quantity + 1)}
              type="button"
            >+</button>
          </div>
        </div>
      </div>

      {/* Identité */}
      <div className="space-y-6">
        <p className="eyebrow">Vos coordonnées</p>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="eyebrow mb-3 block">Prénom *</span>
            <input className="input-field" onChange={(e) => update("firstName", e.target.value)} required type="text" value={values.firstName} />
          </label>
          <label className="block">
            <span className="eyebrow mb-3 block">Nom *</span>
            <input className="input-field" onChange={(e) => update("lastName", e.target.value)} required type="text" value={values.lastName} />
          </label>
          <label className="block">
            <span className="eyebrow mb-3 block">E-mail *</span>
            <input className="input-field" onChange={(e) => update("email", e.target.value)} required type="email" value={values.email} />
          </label>
          <label className="block">
            <span className="eyebrow mb-3 block">Téléphone</span>
            <input className="input-field" onChange={(e) => update("phone", e.target.value)} type="tel" value={values.phone} />
          </label>
        </div>
      </div>

      {/* Adresse */}
      <div className="space-y-6">
        <p className="eyebrow">Adresse de livraison</p>
        <label className="block">
          <span className="eyebrow mb-3 block">Adresse *</span>
          <input className="input-field" onChange={(e) => update("address", e.target.value)} required type="text" value={values.address} />
        </label>
        <div className="grid gap-6 md:grid-cols-3">
          <label className="block">
            <span className="eyebrow mb-3 block">Code postal *</span>
            <input className="input-field" onChange={(e) => update("postalCode", e.target.value)} required type="text" value={values.postalCode} />
          </label>
          <label className="block">
            <span className="eyebrow mb-3 block">Ville *</span>
            <input className="input-field" onChange={(e) => update("city", e.target.value)} required type="text" value={values.city} />
          </label>
          <label className="block">
            <span className="eyebrow mb-3 block">Pays *</span>
            <input className="input-field" onChange={(e) => update("country", e.target.value)} required type="text" value={values.country} />
          </label>
        </div>
      </div>

      {/* Message */}
      <label className="block">
        <span className="eyebrow mb-3 block">Message (facultatif)</span>
        <textarea
          className="input-field min-h-24 resize-y"
          onChange={(e) => update("message", e.target.value)}
          placeholder="Questions sur l'installation, délais, accessoires..."
          value={values.message}
        />
      </label>

      {/* Résumé + CTA */}
      <div className="border border-outline bg-surface-muted p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-1">Total précommande</p>
            <p className="font-headline text-4xl font-bold tracking-[-0.06em]">
              {formatPrice(totalPrice)}
            </p>
            <p className="mt-1 text-xs text-on-surface-muted">
              {selectedProduct.name} × {values.quantity} — Prix de lancement TTC
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <button className="button-primary w-full justify-center" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Traitement en cours..." : "Confirmer ma précommande"}
        </button>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <p className="text-xs leading-6 text-on-surface-muted">
          En confirmant, vous recevrez par email les coordonnées bancaires pour
          effectuer votre virement. Votre réservation est bloquée pendant 7 jours.
          Aucun IBAN n'est affiché sur ce site.
        </p>
      </div>
    </form>
  );
}
