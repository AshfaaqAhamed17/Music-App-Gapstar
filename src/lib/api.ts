import { API_KEY, BASE_URL } from "@/config/constant";
import axios, { AxiosError } from "axios";

const API_TIMEOUT = 8000;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    api_key: API_KEY,
    format: "json",
  },
});

// generic error logging
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
