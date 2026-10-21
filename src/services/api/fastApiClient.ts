import axios from "axios";

const FASTAPI_BASE_URL = process.env.NEXT_PUBLIC_FASTAPI_BASE_URL;

const fastApiClient = axios.create({
  baseURL: FASTAPI_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

fastApiClient.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_FASTAPI_TOKEN;

  if (!token) {
    throw new Error("FastAPI token is missing from the environment.");
  }

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default fastApiClient;
