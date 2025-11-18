import { useCallback } from "react";
import { useFavoritesStore } from "@/store/favorites-store";
import { toaster } from "@/lib/toaster";
import type { TopTracksResponse } from "@/types/artist-details";

export function useFavoriteHandler() {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const handleFavoriteClick = useCallback(
    (track: TopTracksResponse["toptracks"]["track"][0]) => {
      if (isFavorite(track.name, track.artist.name)) {
        removeFavorite(track.name, track.artist.name);
        toaster.create({
          title: "Removed from favorites",
          type: "info",
        });
      } else {
        addFavorite({
          name: track.name,
          artist: track.artist,
          url: track.url,
          image: track.image,
          duration: track.duration,
          playcount: track.playcount,
          streamable: {
            fulltrack: "",
            "#text": "",
          },
          "@attr": {
            rank: 0,
          },
        });
        toaster.create({
          title: "Added to favorites",
          type: "success",
        });
      }
    },
    [addFavorite, removeFavorite, isFavorite]
  );

  return { handleFavoriteClick, isFavorite };
}
