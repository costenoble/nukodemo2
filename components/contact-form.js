"use client";

import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  projectType: "Question taille",
  message: ""
};

export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Impossible d'envoyer votre message.");
      }

      setStatus({ type: "success", message: payload.message });
      setValues(initialValues);
    } catch (contactError) {
      setStatus({ type: "error", message: contactError.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>
      <div className="grid gap-10 md:grid-cols-2">
        <label className="block">
          <span className="eyebrow mb-3 block">Nom</span>
          <input
            className="input-field"
            onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
            required
            type="text"
            value={values.name}
          />
        </label>

        <label className="block">
          <span className="eyebrow mb-3 block">E-mail</span>
          <input
            className="input-field"
            onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
            required
            type="email"
            value={values.email}
          />
        </label>
      </div>

      <label className="block">
        <span className="eyebrow mb-3 block">Sujet</span>
        <select
          className="input-field"
          onChange={(event) => setValues((current) => ({ ...current, projectType: event.target.value }))}
          value={values.projectType}
        >
          <option>Question taille</option>
          <option>Question matière / entretien</option>
          <option>Suivi de commande</option>
          <option>Retour / échange</option>
          <option>Partenariat / revendeur</option>
          <option>Autre</option>
        </select>
      </label>

      <label className="block">
        <span className="eyebrow mb-3 block">Message</span>
        <textarea
          className="input-field min-h-40 resize-y"
          onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))}
          required
          value={values.message}
        />
      </label>

      <div className="space-y-3">
        <button className="button-primary" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Envoi..." : "Envoyer le message"}
        </button>

        {status.message ? (
          <p className={status.type === "success" ? "text-sm text-green-700" : "text-sm text-red-700"}>
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
