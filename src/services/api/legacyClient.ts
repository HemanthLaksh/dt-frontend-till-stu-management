import axios from "axios";

const LEGACY_PORTAL_URL =
  process.env.NEXT_PUBLIC_LEGACY_PORTAL_URL ?? "";

const legacyPortalClient = axios.create({
  baseURL: LEGACY_PORTAL_URL,
  timeout: 15000,
  withCredentials: true,
});

export default legacyPortalClient;