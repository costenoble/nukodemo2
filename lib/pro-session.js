import { cookies } from "next/headers";

export async function getProSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("pro-session")?.value;
  if (!raw) return null;
  try {
    return JSON.parse(Buffer.from(raw, "base64").toString("utf-8"));
  } catch {
    return null;
  }
}
