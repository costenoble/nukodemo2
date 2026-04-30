"use client";

import { useState } from "react";

const PROFILES = [
  {
    id: "amenageur-van",
    label: "Aménageur van / fourgon",
    description: "Je transforme des véhicules et j'installe des poêles pour mes clients."
  },
  {
    id: "revendeur",
    label: "Revendeur",
    description: "Je souhaite revendre les appareils NUKÖ dans mon point de vente ou en ligne."
  },
  {
    id: "distributeur",
    label: "Distributeur",
    description: "Je vise une distribution à l'échelle d'une région ou d'un pays."
  },
  {
    id: "autre",
    label: "Autre profil",
    description: "Architecte, constructeur, bureau d'études ou autre."
  }
];

const MIN_ORDERS = {
  "amenageur-van": null,
  revendeur: 5,
  distributeur: 20,
  autre: null
};

const initialValues = {
  profile: "",
  company: "",
  name: "",
  email: "",
  phone: "",
  country: "",
  zone: "",
  annualVolume: "",
  firstOrderQty: "",
  existingRange: "",
  projectDescription: "",
  message: ""
};

export function ProfessionnelForm() {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  function update(key, val) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  const profile = PROFILES.find((p) => p.id === values.profile);
  const minOrder = values.profile ? MIN_ORDERS[values.profile] : null;

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          projectType: `Pro — ${profile?.label ?? values.profile}`,
          message: [
            `Profil : ${profile?.label ?? values.profile}`,
            `Société : ${values.company}`,
            values.phone ? `Téléphone : ${values.phone}` : null,
            values.country ? `Pays : ${values.country}` : null,
            values.zone ? `Zone / région : ${values.zone}` : null,
            values.annualVolume ? `Volume annuel estimé : ${values.annualVolume} unités` : null,
            values.firstOrderQty ? `Première commande envisagée : ${values.firstOrderQty} unités` : null,
            values.existingRange ? `Gamme actuelle : ${values.existingRange}` : null,
            values.projectDescription ? `Projet : ${values.projectDescription}` : null,
            values.message ? `Message : ${values.message}` : null
          ]
            .filter(Boolean)
            .join("\n")
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'envoi.");
      setStatus({ type: "success", message: data.message });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status.type === "success") {
    return (
      <div className="surface-panel p-10 text-center">
        <p className="eyebrow mb-4">Demande reçue</p>
        <h2 className="font-headline text-4xl font-bold tracking-[-0.05em]">
          Nous revenons vers vous sous 48 h
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-on-surface-muted">{status.message}</p>
      </div>
    );
  }

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      {/* Step 1 — Profile */}
      <div className="space-y-4">
        <p className="eyebrow">Votre profil *</p>
        <div className="grid gap-3 md:grid-cols-2">
          {PROFILES.map((p) => (
            <button
              key={p.id}
              className={`flex flex-col items-start border p-5 text-left transition-all duration-200 ${
                values.profile === p.id
                  ? "border-primary bg-primary text-white"
                  : "border-outline bg-background hover:border-primary"
              }`}
              onClick={() => update("profile", p.id)}
              type="button"
            >
              <span className="font-headline text-xl font-bold tracking-[-0.04em]">{p.label}</span>
              <span className={`mt-1.5 text-xs leading-5 ${values.profile === p.id ? "text-white/75" : "text-on-surface-muted"}`}>
                {p.description}
              </span>
            </button>
          ))}
        </div>

        {minOrder !== null && (
          <div className="border border-secondary/30 bg-secondary/5 p-4 text-sm leading-6">
            <span className="font-bold text-secondary">Commande minimum : {minOrder} unités</span>{" "}
            pour ce profil. La grille tarifaire dégressive est disponible sur cette page.
          </div>
        )}
      </div>

      {/* Step 2 — Coordonnées */}
      {values.profile && (
        <div className="space-y-6">
          <p className="eyebrow">Vos coordonnées</p>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="eyebrow mb-3 block">Nom *</span>
              <input
                className="input-field"
                onChange={(e) => update("name", e.target.value)}
                required
                type="text"
                value={values.name}
              />
            </label>
            <label className="block">
              <span className="eyebrow mb-3 block">Société *</span>
              <input
                className="input-field"
                onChange={(e) => update("company", e.target.value)}
                required
                type="text"
                value={values.company}
              />
            </label>
            <label className="block">
              <span className="eyebrow mb-3 block">E-mail professionnel *</span>
              <input
                className="input-field"
                onChange={(e) => update("email", e.target.value)}
                required
                type="email"
                value={values.email}
              />
            </label>
            <label className="block">
              <span className="eyebrow mb-3 block">Téléphone</span>
              <input
                className="input-field"
                onChange={(e) => update("phone", e.target.value)}
                type="tel"
                value={values.phone}
              />
            </label>
          </div>
        </div>
      )}

      {/* Step 3 — Champs conditionnels */}
      {values.profile === "amenageur-van" && (
        <div className="space-y-6">
          <p className="eyebrow">Votre activité</p>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="eyebrow mb-3 block">Nombre d'aménagements / an</span>
              <input
                className="input-field"
                onChange={(e) => update("annualVolume", e.target.value)}
                placeholder="Ex : 12"
                type="text"
                value={values.annualVolume}
              />
            </label>
            <label className="block">
              <span className="eyebrow mb-3 block">Première commande envisagée</span>
              <select
                className="input-field"
                onChange={(e) => update("firstOrderQty", e.target.value)}
                value={values.firstOrderQty}
              >
                <option value="">— Sélectionner —</option>
                <option>1 – 2 appareils</option>
                <option>3 – 5 appareils</option>
                <option>6 – 10 appareils</option>
                <option>Plus de 10</option>
              </select>
            </label>
          </div>
          <label className="block">
            <span className="eyebrow mb-3 block">Décrivez votre activité</span>
            <textarea
              className="input-field min-h-28 resize-y"
              onChange={(e) => update("projectDescription", e.target.value)}
              placeholder="Types de véhicules, clientèle, zone géographique..."
              value={values.projectDescription}
            />
          </label>
        </div>
      )}

      {values.profile === "revendeur" && (
        <div className="space-y-6">
          <p className="eyebrow">Votre réseau</p>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="eyebrow mb-3 block">Pays *</span>
              <select
                className="input-field"
                onChange={(e) => update("country", e.target.value)}
                required
                value={values.country}
              >
                <option value="">— Sélectionner —</option>
                <option value="France">France</option>
                <option value="Belgique">Belgique</option>
                <option value="Suisse">Suisse</option>
                <option value="Allemagne">Allemagne</option>
                <option value="Espagne">Espagne</option>
                <option value="Italie">Italie</option>
                <option value="Pays-Bas">Pays-Bas</option>
                <option value="Autre">Autre pays</option>
              </select>
            </label>
            <label className="block">
              <span className="eyebrow mb-3 block">Volume annuel estimé (unités)</span>
              <input
                className="input-field"
                onChange={(e) => update("annualVolume", e.target.value)}
                placeholder="Ex : 20"
                type="number"
                value={values.annualVolume}
              />
            </label>
          </div>

          {values.country === "France" && (
            <div className="border border-[#dcbf96]/40 bg-[#dcbf96]/8 p-5">
              <p className="text-sm font-bold text-secondary">Revendeur en France</p>
              <p className="mt-2 text-sm leading-6 text-on-surface-muted">
                Nous travaillons avec des partenaires revendeurs sélectionnés sur le territoire français.
                Avant de soumettre votre demande, <strong>contactez-nous directement</strong> pour vérifier
                la disponibilité dans votre zone et éviter les doublons de distribution.
              </p>
              <a
                className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-secondary underline"
                href="mailto:pro@nuko.example"
              >
                pro@nuko.example →
              </a>
            </div>
          )}

          <label className="block">
            <span className="eyebrow mb-3 block">Gamme actuelle (chauffage ou outdoor)</span>
            <input
              className="input-field"
              onChange={(e) => update("existingRange", e.target.value)}
              placeholder="Marques ou produits que vous distribuez déjà..."
              type="text"
              value={values.existingRange}
            />
          </label>
        </div>
      )}

      {values.profile === "distributeur" && (
        <div className="space-y-6">
          <p className="eyebrow">Zone de distribution</p>
          <div className="grid gap-6 md:grid-cols-2">
            <label className="block">
              <span className="eyebrow mb-3 block">Pays principal *</span>
              <input
                className="input-field"
                onChange={(e) => update("country", e.target.value)}
                required
                type="text"
                value={values.country}
              />
            </label>
            <label className="block">
              <span className="eyebrow mb-3 block">Zone couverte</span>
              <input
                className="input-field"
                onChange={(e) => update("zone", e.target.value)}
                placeholder="Ex : Benelux, Scandinavie, Suisse + Autriche..."
                type="text"
                value={values.zone}
              />
            </label>
            <label className="block">
              <span className="eyebrow mb-3 block">Volume annuel envisagé (unités)</span>
              <input
                className="input-field"
                onChange={(e) => update("annualVolume", e.target.value)}
                placeholder="Ex : 50"
                type="number"
                value={values.annualVolume}
              />
            </label>
            <label className="block">
              <span className="eyebrow mb-3 block">Engagement première commande</span>
              <select
                className="input-field"
                onChange={(e) => update("firstOrderQty", e.target.value)}
                value={values.firstOrderQty}
              >
                <option value="">— Sélectionner —</option>
                <option>20 – 30 appareils</option>
                <option>30 – 50 appareils</option>
                <option>Plus de 50</option>
              </select>
            </label>
          </div>
          <label className="block">
            <span className="eyebrow mb-3 block">Votre réseau de distribution actuel</span>
            <textarea
              className="input-field min-h-28 resize-y"
              onChange={(e) => update("existingRange", e.target.value)}
              placeholder="Structure, canaux de vente, marques partenaires..."
              value={values.existingRange}
            />
          </label>
        </div>
      )}

      {values.profile === "autre" && (
        <div className="space-y-4">
          <p className="eyebrow">Votre projet</p>
          <label className="block">
            <span className="eyebrow mb-3 block">Décrivez votre projet *</span>
            <textarea
              className="input-field min-h-36 resize-y"
              onChange={(e) => update("projectDescription", e.target.value)}
              required
              value={values.projectDescription}
            />
          </label>
        </div>
      )}

      {/* Message libre */}
      {values.profile && (
        <div className="space-y-4">
          <label className="block">
            <span className="eyebrow mb-3 block">Message complémentaire (facultatif)</span>
            <textarea
              className="input-field min-h-24 resize-y"
              onChange={(e) => update("message", e.target.value)}
              value={values.message}
            />
          </label>
        </div>
      )}

      {values.profile && (
        <div className="space-y-3">
          <button
            className="button-primary"
            disabled={isSubmitting || !values.name || !values.email}
            type="submit"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
          </button>
          {status.type === "error" && (
            <p className="text-sm text-red-700">{status.message}</p>
          )}
          <p className="text-xs leading-6 text-on-surface-muted">
            Nous répondons sous 48 h ouvrées. Pour les demandes de distribution hors France,
            merci de préciser votre zone dans le champ dédié.
          </p>
        </div>
      )}
    </form>
  );
}
