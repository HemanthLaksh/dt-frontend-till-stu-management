const TOKEN_KEY = "dt-admin-api-token";
const TOKEN_EXPIRY_KEY = "dt-admin-api-token-expiry";

const REFRESH_THRESHOLD_MS = 5 * 60 * 1000;

export interface StoredToken {
  token: string;
  expiresAt: number;
}

export function getStoredToken(): StoredToken | null {
  if (typeof window === "undefined") {
    return null;
  }

  const token = sessionStorage.getItem(TOKEN_KEY);
  const expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);

  if (!token || !expiry) {
    return null;
  }

  const expiresAt = Number(expiry);

  if (!Number.isFinite(expiresAt)) {
    clearStoredToken();
    return null;
  }

  return { token, expiresAt };
}

export function storeToken(token: string, expiresInSeconds: number): void {
  if (typeof window === "undefined") {
    return;
  }

  const expiresAt = Date.now() + expiresInSeconds * 1000;

  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(TOKEN_EXPIRY_KEY, String(expiresAt));
}

export function isTokenRefreshRequired(): boolean {
  const storedToken = getStoredToken();

  if (!storedToken) {
    return true;
  }

  return storedToken.expiresAt - Date.now() <= REFRESH_THRESHOLD_MS;
}

export function clearStoredToken(): void {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
}
