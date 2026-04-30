"use client";

import { useRouter } from "next/navigation";

export function ProLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/pro/auth", { method: "DELETE" });
    router.push("/pro");
    router.refresh();
  }

  return (
    <button className="button-secondary text-sm" onClick={handleLogout} type="button">
      Se deconnecter
    </button>
  );
}
