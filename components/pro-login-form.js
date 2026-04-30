"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProLoginForm() {
  const router = useRouter();
  const [values, setValues] = useState({ code: "", company: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function update(key, val) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/pro/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Acces refuse.");
      }

      router.push("/pro/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <label className="block">
        <span className="eyebrow mb-3 block">Code d'acces revendeur *</span>
        <input
          className="input-field"
          onChange={(e) => update("code", e.target.value)}
          placeholder="NUKO-PRO-XXXX"
          required
          type="text"
          value={values.code}
        />
      </label>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="eyebrow mb-3 block">Societe *</span>
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
      </div>

      <div className="space-y-3">
        <button className="button-primary" disabled={isLoading} type="submit">
          {isLoading ? "Connexion..." : "Acceder au portail revendeur"}
        </button>
        {error && <p className="text-sm text-red-700">{error}</p>}
      </div>

      <p className="text-sm leading-7 text-on-surface-muted">
        Pas encore partenaire NUKO ?{" "}
        <a className="underline hover:text-on-surface" href="/contact">
          Contactez-nous
        </a>{" "}
        pour obtenir votre code d'acces revendeur.
      </p>
    </form>
  );
}
