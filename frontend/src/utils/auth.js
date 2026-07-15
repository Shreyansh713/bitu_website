const TOKEN_KEY = "bitto_admin_token";
const ADMIN_KEY = "bitto_admin";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveSession(token, admin) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
}

export function getAdmin() {
  const admin = localStorage.getItem(ADMIN_KEY);
  return admin ? JSON.parse(admin) : null;
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}
