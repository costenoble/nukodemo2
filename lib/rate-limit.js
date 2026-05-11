const store = new Map();

export function rateLimit(ip, { limit = 10, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const record = store.get(ip) ?? { count: 0, resetAt: now + windowMs };

  if (now > record.resetAt) {
    record.count = 0;
    record.resetAt = now + windowMs;
  }

  record.count++;
  store.set(ip, record);

  return { success: record.count <= limit };
}

export function getClientIp(request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}
