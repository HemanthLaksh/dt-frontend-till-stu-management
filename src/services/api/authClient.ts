import axios from "axios";

import { generateApiToken } from "@/services/api/tokenService";
import {
  getStoredToken,
  isTokenRefreshRequired,
} from "@/services/api/tokenStorage";

const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

const authClient = axios.create({
  baseURL: AUTH_API_URL,
  timeout: 15000,
});

let tokenRefreshPromise: Promise<string> | null = null;

async function getValidToken(): Promise<string> {
  const storedToken = getStoredToken();

  if (storedToken && !isTokenRefreshRequired()) {
    return storedToken.token;
  }

  if (!tokenRefreshPromise) {
    tokenRefreshPromise = generateApiToken().finally(() => {
      tokenRefreshPromise = null;
    });
  }

  return tokenRefreshPromise;
}

authClient.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const url = config.url ?? "";

  const isAuthEndpoint =
    url.includes("/admin/login/") ||
    url.includes("/admin/admin/curl_validateotp/");

  const isTokenEndpoint =
    url.includes("/generate-test-token/") || url.includes("/token_manager.php");

  if (isAuthEndpoint || isTokenEndpoint) {
    return config;
  }

  const token = await getValidToken();

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default authClient;
