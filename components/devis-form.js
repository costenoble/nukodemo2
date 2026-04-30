"use client";

import { useState } from "react";

const STEPS = [
  { id: "projet", label: "Votre projet" },
  { id: "usage", label: "Usage & volume" },
  { id: "contact", label: "Coordonnees" },
  { id: "recap", label: "Recapitulatif" }
];

const initialValues = {
  projectType: "",
  volume: "",
  isolation: "",
  model: "Nomad 01",
  options: [],
  name: "",
  email: "",
  phone: "",
  message: ""
};

const PROJECT_TYPES = [
  { id: "van", label: "Van / Fourgon amenage" },
  { id: "tiny-house", label: "Tiny House" },
  { id: "chalet", label: "Chalet / Refuge compact" },
  { id: "atelier", label: "Atelier / Studio" },
  { id: "autre", label: "Autre projet" }
];

const VOLUMES = [
  { id: "moins-15", label: "Moins de 15 m²" },
  { id: "15-25", label: "15 – 25 m²" },
  { id: "25-40", label: "25 – 40 m²" },
  { id: "plus-40", label: "Plus de 40 m²" }
];

const ISOLATIONS = [
  { id: "bien", label: "Bien isolé" },
  { id: "moyen", label: "Isolation moyenne" },
  { id: "faible", label: "Peu ou pas isolé" },
  { id: "inconnu", label: "Je ne sais pas" }
];

const OPTIONS = [
  { id: "kit-traversee", label: "Kit traversée de toit" },
  { id: "protection-sol", label: "Protection de sol" },
  { id: "thermometre", label: "Thermomètre de conduit" },
  { id: "bouclier", label: "Bouclier thermique additionnel" }
];

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center text-xs font-bold transition-colors duration-300 ${
                index <= currentStep
                  ? "bg-primary text-white"
                  : "border border-outline bg-background text-on-surface-muted"
              }`}
            >
              {index < currentStep ? "✓" : index + 1}
            </div>
            <span
              className={`mt-1.5 text-[10px] uppercase tracking-[0.14em] ${
                index === currentStep ? "text-primary font-bold" : "text-on-surface-muted"
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={`mb-5 h-px w-12 transition-colors duration-300 sm:w-20 ${
                index < currentStep ? "bg-primary" : "bg-outline"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ChoiceGrid({ options, value, onChange, multiple = false }) {
  const selected = multiple ? (Array.isArray(value) ? value : []) : value;

  function handleClick(id) {
    if (multiple) {
      const next = selected.includes(id)
        ? selected.filter((v) => v !== id)
        : [...selected, id];
      onChange(next);
    } else {
      onChange(id);
    }
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((opt) => {
        const isSelected = multiple ? selected.includes(opt.id) : selected === opt.id;
        return (
          <button
            key={opt.id}
            className={`w-full border px-5 py-4 text-left text-sm transition-all duration-200 ${
              isSelected
                ? "border-primary bg-primary text-white"
                : "border-outline bg-background text-on-surface hover:border-primary"
            }`}
            onClick={() => handleClick(opt.id)}
            type="button"
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function DevisForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  function update(key, val) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function canAdvance() {
    if (step === 0) return Boolean(values.projectType);
    if (step === 1) return Boolean(values.volume) && Boolean(values.isolation);
    if (step === 2) return Boolean(values.name) && Boolean(values.email);
    return true;
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    const body = {
      name: values.name,
      email: values.email,
      projectType: PROJECT_TYPES.find((p) => p.id === values.projectType)?.label ?? values.projectType,
      message: [
        `Volume : ${VOLUMES.find((v) => v.id === values.volume)?.label ?? values.volume}`,
        `Isolation : ${ISOLATIONS.find((i) => i.id === values.isolation)?.label ?? values.isolation}`,
        `Modele : ${values.model}`,
        values.options.length
          ? `Options : ${values.options.map((o) => OPTIONS.find((opt) => opt.id === o)?.label).join(", ")}`
          : "",
        values.phone ? `Tel : ${values.phone}` : "",
        values.message ? `Message libre : ${values.message}` : ""
      ]
        .filter(Boolean)
        .join("\n")
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Impossible d'envoyer votre demande.");
      }

      setStatus({ type: "success", message: payload.message });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status.type === "success") {
    return (
      <div className="surface-panel p-10 text-center">
        <p className="eyebrow mb-4 text-center">Demande envoyee</p>
        <h2 className="font-headline text-4xl font-bold tracking-[-0.05em]">
          Nous revenons vers vous sous 48 h
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-on-surface-muted">
          {status.message}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <StepIndicator currentStep={step} />

      <div className="surface-panel p-8 md:p-10">
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <p className="eyebrow mb-2">Etape 1 / 4</p>
              <h2 className="font-headline text-3xl font-bold tracking-[-0.05em]">
                Quel est votre projet ?
              </h2>
            </div>
            <ChoiceGrid
              options={PROJECT_TYPES}
              value={values.projectType}
              onChange={(v) => update("projectType", v)}
            />
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8">
            <div>
              <p className="eyebrow mb-2">Etape 2 / 4</p>
              <h2 className="font-headline text-3xl font-bold tracking-[-0.05em]">
                Volume et isolation
              </h2>
            </div>
            <div className="space-y-4">
              <p className="eyebrow">Volume approximatif</p>
              <ChoiceGrid
                options={VOLUMES}
                value={values.volume}
                onChange={(v) => update("volume", v)}
              />
            </div>
            <div className="space-y-4">
              <p className="eyebrow">Niveau d'isolation</p>
              <ChoiceGrid
                options={ISOLATIONS}
                value={values.isolation}
                onChange={(v) => update("isolation", v)}
              />
            </div>
            <div className="space-y-4">
              <p className="eyebrow">Options souhaitees (facultatif)</p>
              <ChoiceGrid
                multiple
                options={OPTIONS}
                value={values.options}
                onChange={(v) => update("options", v)}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <p className="eyebrow mb-2">Etape 3 / 4</p>
              <h2 className="font-headline text-3xl font-bold tracking-[-0.05em]">
                Vos coordonnees
              </h2>
            </div>
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
                <span className="eyebrow mb-3 block">E-mail *</span>
                <input
                  className="input-field"
                  onChange={(e) => update("email", e.target.value)}
                  required
                  type="email"
                  value={values.email}
                />
              </label>
            </div>
            <label className="block">
              <span className="eyebrow mb-3 block">Telephone (facultatif)</span>
              <input
                className="input-field"
                onChange={(e) => update("phone", e.target.value)}
                type="tel"
                value={values.phone}
              />
            </label>
            <label className="block">
              <span className="eyebrow mb-3 block">Message libre (facultatif)</span>
              <textarea
                className="input-field min-h-28 resize-y"
                onChange={(e) => update("message", e.target.value)}
                value={values.message}
              />
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <p className="eyebrow mb-2">Etape 4 / 4</p>
              <h2 className="font-headline text-3xl font-bold tracking-[-0.05em]">
                Recapitulatif de votre demande
              </h2>
            </div>
            <dl className="grid gap-4 text-sm">
              {[
                ["Projet", PROJECT_TYPES.find((p) => p.id === values.projectType)?.label],
                ["Volume", VOLUMES.find((v) => v.id === values.volume)?.label],
                ["Isolation", ISOLATIONS.find((i) => i.id === values.isolation)?.label],
                [
                  "Options",
                  values.options.length
                    ? values.options.map((o) => OPTIONS.find((opt) => opt.id === o)?.label).join(", ")
                    : "Aucune"
                ],
                ["Nom", values.name],
                ["E-mail", values.email],
                values.phone ? ["Telephone", values.phone] : null
              ]
                .filter(Boolean)
                .map(([label, val]) => (
                  <div key={label} className="flex gap-6 border-b border-outline pb-4 last:border-b-0">
                    <dt className="eyebrow w-28 shrink-0">{label}</dt>
                    <dd className="text-on-surface">{val}</dd>
                  </div>
                ))}
            </dl>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            className="button-secondary"
            onClick={() => setStep((s) => s - 1)}
            type="button"
          >
            Retour
          </button>
        ) : (
          <span />
        )}

        {step < STEPS.length - 1 ? (
          <button
            className={`button-primary ${canAdvance() ? "" : "opacity-40 cursor-not-allowed"}`}
            disabled={!canAdvance()}
            onClick={() => setStep((s) => s + 1)}
            type="button"
          >
            Continuer
          </button>
        ) : (
          <div className="space-y-3">
            <button
              className="button-primary"
              disabled={isSubmitting}
              onClick={handleSubmit}
              type="button"
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande de devis"}
            </button>
            {status.type === "error" && (
              <p className="text-sm text-red-700">{status.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
