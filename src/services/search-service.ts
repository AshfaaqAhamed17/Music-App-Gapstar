import { api } from "../lib/api";

export const searchService = {
  async searchTracks(query: string, limit: number = 10) {
    try {
      const { data } = await api.get("", {
        params: {
          ...api.defaults.params,
          method: "track.search",
          track: query,
          limit,
        },
      });
      return data;
    } catch (error) {
      console.error("Error searching tracks:", error);
      throw error;
    }
  },

  async searchArtists(query: string, limit: number = 10) {
    try {
      const { data } = await api.get("", {
        params: {
          ...api.defaults.params,
          method: "artist.search",
          artist: query,
          limit,
        },
      });
      return data;
    } catch (error) {
      console.error("Error searching artists:", error);
      throw error;
    }
  },

  async searchAlbums(query: string, limit: number = 10) {
    try {
      const { data } = await api.get("", {
        params: {
          ...api.defaults.params,
          method: "album.search",
          album: query,
          limit,
        },
      });
      return data;
    } catch (error) {
      console.error("Error searching albums:", error);
      throw error;
    }
  },
};
