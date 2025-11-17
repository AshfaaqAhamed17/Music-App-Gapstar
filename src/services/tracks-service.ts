import { api } from "../lib/api";

export const tracksServices = {
  async fetchTopTracks(limit: number = 50) {
    try {
      const { data } = await api.get("", {
        params: {
          ...api.defaults.params,
          method: "chart.gettoptracks",
          limit,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching top tracks:", error);
      throw error;
    }
  },
};
