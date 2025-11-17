import { create } from "zustand";
import { albumServices } from "@/service/album-service";
import type { AlbumResponse, AlbumDetailsResponse } from "@/types/album";

interface AlbumStore {
  mostPopular: AlbumResponse[];
  allAlbums: AlbumResponse[];
  isLoading: boolean;
  fetchAlbums: () => Promise<void>;
  fetchAlbumDetails: (name: string, album: string) => Promise<void>;
  selectedAlbum: AlbumDetailsResponse["album"] | null;
}

export const useAlbumStore = create<AlbumStore>((set) => ({
  mostPopular: [],
  allAlbums: [],
  isLoading: false,
  selectedAlbum: null,

  fetchAlbums: async () => {
    set({ isLoading: true });

    try {
      const response = await albumServices.fetchAllAlbums();
      const fetchedAlbums = response.albums.album;

      const sorted = [...fetchedAlbums].sort(
        (a, b) => Number(a["@attr"].rank) - Number(b["@attr"].rank)
      );

      set({
        mostPopular: sorted.slice(0, 5),
        allAlbums: sorted.slice(5),
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch albums:", error);
      set({ isLoading: false });
    }
  },

  fetchAlbumDetails: async (name: string, album: string) => {
    set({ isLoading: true });
    try {
      const response = await albumServices.fetchAlbumDetails(name, album);
      set({ selectedAlbum: response.album, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch album details:", error);
      set({ isLoading: false });
    }
  },
}));
