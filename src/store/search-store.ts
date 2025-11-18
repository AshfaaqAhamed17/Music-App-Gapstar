import { create } from "zustand";
import { searchService } from "../services/search-service";
import type { Artist } from "@/types/artist";
import type { AlbumResponse } from "@/types/album";
import type { TopTracksResponse } from "@/types/artist-details";

interface SearchState {
  query: string;
  tracks: TopTracksResponse["toptracks"]["track"];
  artists: Artist[];
  albums: AlbumResponse[];
  loading: boolean;
  error: string | null;
  setQuery: (query: string) => void;
  performSearch: (query: string) => Promise<void>;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  tracks: [],
  artists: [],
  albums: [],
  loading: false,
  error: null,

  setQuery: (query) => set({ query }),

  performSearch: async (query: string) => {
    if (!query || query.length < 2) {
      set({ tracks: [], artists: [], albums: [], loading: false });
      return;
    }

    set({ loading: true, error: null });

    try {
      const [tracksData, artistsData, albumsData] = await Promise.all([
        searchService.searchTracks(query),
        searchService.searchArtists(query),
        searchService.searchAlbums(query),
      ]);

      set({
        tracks: tracksData?.results?.trackmatches?.track || [],
        artists: artistsData?.results?.artistmatches?.artist || [],
        albums: albumsData?.results?.albummatches?.album || [],
        loading: false,
      });
    } catch {
      set({
        error: "Failed to perform search",
        loading: false,
      });
    }
  },
}));
