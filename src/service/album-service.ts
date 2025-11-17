import { api } from "../lib/api";

export const albumServices = {
  async fetchAllAlbums(limit: number = 50) {
    try {
      const { data } = await api.get("", {
        params: {
          ...api.defaults.params,
          method: "tag.gettopalbums",
          tag: "rock",
          limit,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching albums:", error);
      throw error;
    }
  },

  async fetchAlbumDetails(name: string, album: string) {
    try {
      const { data } = await api.get("", {
        params: {
          ...api.defaults.params,
          method: "album.getinfo",
          artist: name,
          tag: "rock",
          album,
          // album: "City to City",
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching album details:", error);
      throw error;
    }
  },

  async fetchAlbumsOfArtist(name: string, limit: number = 50) {
    try {
      // https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=cher&api_key=d732731be2f5f0ec4b10e5a3607d7090&format=json
      const { data } = await api.get("", {
        params: {
          ...api.defaults.params,
          method: "artist.gettopalbums",
          artist: name,
          limit,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching artist's albums:", error);
      throw error;
    }
  },
};
