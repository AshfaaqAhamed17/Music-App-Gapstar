import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AlbumTrack } from "@/types/album";

interface FavoritesStore {
  favorites: AlbumTrack[];
  addFavorite: (track: AlbumTrack) => void;
  removeFavorite: (trackName: string, artistName: string) => void;
  isFavorite: (trackName: string, artistName: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (track) => {
        set((state) => {
          const exists = state.favorites.some(
            (f) => f.name === track.name && f.artist.name === track.artist.name
          );
          if (exists) return state;
          return { favorites: [...state.favorites, track] };
        });
      },

      removeFavorite: (trackName, artistName) => {
        set((state) => ({
          favorites: state.favorites.filter(
            (f) => !(f.name === trackName && f.artist.name === artistName)
          ),
        }));
      },

      isFavorite: (trackName, artistName) => {
        return get().favorites.some(
          (f) => f.name === trackName && f.artist.name === artistName
        );
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "music-app-favorites",
    }
  )
);
