import axios from "axios";

import { decryptData } from "@/utils/crypto";
import { storeToken } from "@/services/api/tokenStorage";

const TOKEN_GENERATION_URL =
  "https://dt-admin-portal-backend-dev-api.doctutorials.com/api/generate-test-token/";

interface TokenGenerationResponse {
  token: string;
  expires_in: number;
}

export async function generateApiToken(): Promise<string> {
  const encryptedCredentials = sessionStorage.getItem(
    "dt-admin-encrypted-credentials",
  );

  if (!encryptedCredentials) {
    throw new Error("Login credentials not found. Please log in again.");
  }

  const decryptedCredentials = await decryptData(encryptedCredentials);

  const credentials = JSON.parse(decryptedCredentials) as {
    userID: string;
    password: string;
  };

  const response = await axios.post<TokenGenerationResponse>(
    TOKEN_GENERATION_URL,
    {
      username: credentials.userID,
      password: credentials.password,
    },
    {
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const { token, expires_in } = response.data;

  if (!token || !expires_in) {
    throw new Error("The token-generation API returned an invalid response.");
  }

  storeToken(token, expires_in);

  return token;
}
