const ALGORITHM = "AES-GCM";
const KEY_LENGTH = 256;

// Frontend-managed key.
// IMPORTANT: This key is extractable from the client bundle.
// Do not treat it as a secure secret.
const SECRET_KEY = "DT-Admin-Portal-Key-2026";

function getEncryptionKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();

  return crypto.subtle
    .digest("SHA-256", encoder.encode(SECRET_KEY))
    .then((keyData) =>
      crypto.subtle.importKey(
        "raw",
        keyData,
        {
          name: ALGORITHM,
          length: KEY_LENGTH,
        },
        false,
        ["encrypt", "decrypt"],
      ),
    );
}

export async function encryptData(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await getEncryptionKey();

  // AES-GCM requires a unique, unpredictable IV for each encryption.
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await crypto.subtle.encrypt(
    {
      name: ALGORITHM,
      iv,
    },
    key,
    encoder.encode(value),
  );

  const encryptedBytes = new Uint8Array(encrypted);

  const combined = new Uint8Array(iv.length + encryptedBytes.length);

  combined.set(iv, 0);
  combined.set(encryptedBytes, iv.length);

  return btoa(
    Array.from(combined, (byte) => String.fromCharCode(byte)).join(""),
  );
}

export async function decryptData(encryptedValue: string): Promise<string> {
  const key = await getEncryptionKey();

  const combined = Uint8Array.from(atob(encryptedValue), (character) =>
    character.charCodeAt(0),
  );

  const iv = combined.slice(0, 12);
  const encrypted = combined.slice(12);

  const decrypted = await crypto.subtle.decrypt(
    {
      name: ALGORITHM,
      iv,
    },
    key,
    encrypted,
  );

  return new TextDecoder().decode(decrypted);
}
