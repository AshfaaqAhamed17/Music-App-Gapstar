import { create } from "zustand";
import { artistServices } from "../services/artist-services";
import type { AlbumResponse } from "@/types/album";
import type { ArtistResponse, TopTracksResponse } from "@/types/artist-details";

export interface Artist {
  name: string;
  playcount: string;
  listeners: string;
  mbid?: string;
  url: string;
  streamable: string;
  image: { "#text": string; size: string }[];
}

interface ArtistStore {
  mostPopularArtists: Artist[];
  allArtists: Artist[];
  isLoading: boolean;

  artistInfo: ArtistResponse["artist"];
  artistTopTracks: TopTracksResponse["toptracks"]["track"];
  artistTopAlbums: AlbumResponse[];
  isArtistLoading: boolean;

  fetchArtists: () => Promise<void>;
  fetchArtistDetails: (name: string) => Promise<void>;
}

export const useArtistStore = create<ArtistStore>((set) => ({
  mostPopularArtists: [],
  allArtists: [],
  isLoading: false,

  artistInfo: {} as ArtistResponse["artist"],
  artistTopTracks: [] as TopTracksResponse["toptracks"]["track"],
  artistTopAlbums: [],
  isArtistLoading: false,

  fetchArtists: async () => {
    set({ isLoading: true });

    try {
      const response = await artistServices.fetchAllArtists();
      const fetchedArtists = response.artists.artist;

      const sorted = [...fetchedArtists].sort(
        (a, b) => Number(b.playcount) - Number(a.playcount)
      );

      set({
        mostPopularArtists: sorted.slice(0, 5),
        allArtists: sorted.slice(5),
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch artists:", error);
      set({ isLoading: false });
    }
  },

  fetchArtistDetails: async (name: string) => {
    set({ isArtistLoading: true });

    try {
      const info = await artistServices.fetchArtistInfo(name);
      const tracks = await artistServices.fetchArtistTopTracks(name);
      const albums = await artistServices.fetchArtistTopAlbums(name);

      set({
        artistInfo: info.artist,
        artistTopTracks: tracks.toptracks.track,
        artistTopAlbums: albums.topalbums.album,
        isArtistLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch artist details:", error);
      set({ isArtistLoading: false });
    }
  },
}));
