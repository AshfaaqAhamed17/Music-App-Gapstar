export const BASE_URL = import.meta.env.VITE_GAPSTAR_MUSIC_API_URL;
export const API_KEY = import.meta.env.VITE_GAPSTAR_MUSIC_API_KEY;

if (!BASE_URL) {
  // You may want to fail fast in production or log for development
  console.warn("VITE_GAPSTAR_MUSIC_API_URL is not set in .env");
}
if (!API_KEY) {
  console.warn("VITE_GAPSTAR_MUSIC_API_KEY is not set in .env");
}
