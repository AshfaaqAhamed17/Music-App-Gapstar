import { api } from "../lib/api";

export const artistServices = {
  async fetchAllArtists(limit: number = 50) {
    try {
      const { data } = await api.get("", {
        params: {
          ...api.defaults.params,
          method: "chart.gettopartists",
          limit,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching artists:", error);
      throw error;
    }
  },

  async fetchArtistInfo(name: string) {
    try {
      const { data } = await api.get("", {
        params: {
          ...api.defaults.params,
          method: "artist.getinfo",
          artist: name,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching artist info:", error);
      throw error;
    }
  },

  async fetchArtistTopTracks(name: string) {
    try {
      const { data } = await api.get("", {
        params: {
          ...api.defaults.params,
          method: "artist.gettoptracks",
          artist: name,
          // limit,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching artist top tracks:", error);
      throw error;
    }
  },

  async fetchArtistTopAlbums(name: string) {
    try {
      const { data } = await api.get("", {
        params: {
          ...api.defaults.params,
          method: "artist.gettopalbums",
          artist: name,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching artist top albums:", error);
      throw error;
    }
  },
};
