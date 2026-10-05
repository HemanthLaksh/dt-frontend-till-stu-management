import axios from "axios";

const AUTH_API_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL;

const authClient = axios.create({
  baseURL: AUTH_API_URL,
  timeout: 15000,
});

export default authClient;