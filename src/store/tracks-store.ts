import { create } from "zustand";
import { tracksServices } from "@/services/tracks-service";

interface Track {
  name: string;
  duration: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: {
    "#text": string;
    fulltrack: string;
  };
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  image: Array<{
    "#text": string;
    size: string;
  }>;
  "@attr": {
    rank: string;
  };
}

interface TracksStore {
  tracks: Track[];
  isLoading: boolean;
  fetchTopTracks: () => Promise<void>;
}

export const useTracksStore = create<TracksStore>((set) => ({
  tracks: [],
  isLoading: false,

  fetchTopTracks: async () => {
    set({ isLoading: true });

    try {
      const response = await tracksServices.fetchTopTracks();
      const fetchedTracks = response.tracks.track;

      set({
        tracks: fetchedTracks,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch top tracks:", error);
      set({ isLoading: false });
    }
  },
}));
