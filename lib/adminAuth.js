import crypto from 'crypto';

// simple shared-password auth for a single admin (the taxi owner). this is
// intentionally lightweight: one password, one httpOnly cookie, no user
// accounts. good enough for a one-person business, not meant for a team
// with different permission levels.

export function expectedToken() {
  const password = process.env.ADMIN_PASSWORD || '';
  return crypto.createHash('sha256').update(`taxi-elbasan-admin:${password}`).digest('hex');
}

export function checkAdminCookie(cookieValue) {
  if (!process.env.ADMIN_PASSWORD) return false;
  return cookieValue === expectedToken();
}

export function requireAdmin(request) {
  const cookie = request.cookies.get('taxi_admin');
  return checkAdminCookie(cookie?.value);
}
