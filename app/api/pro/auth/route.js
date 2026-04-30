import { cookies } from "next/headers";

import { PRO_ACCESS_CODE } from "@/lib/pro-pricing";

export async function POST(request) {
  try {
    const { code, company, email } = await request.json();

    if (!code || code.trim().toUpperCase() !== PRO_ACCESS_CODE.toUpperCase()) {
      return Response.json({ error: "Code d'acces invalide." }, { status: 401 });
    }

    if (!email || !company) {
      return Response.json({ error: "Societe et e-mail requis." }, { status: 400 });
    }

    const cookieStore = await cookies();
    cookieStore.set("pro-session", Buffer.from(JSON.stringify({ company, email })).toString("base64"), {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/"
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("pro-session");
  return Response.json({ ok: true });
}
