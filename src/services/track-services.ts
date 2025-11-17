import { api } from "../lib/api";

export const TracksServices = {
  getTopTracks(limit = 5) {
    const data = api.get("", {
      params: {
        method: "chart.gettoptracks",
        limit,
      },
    });
    return data;
  },
};
