export interface FavoriteTrack {
  name: string;
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  url: string;
  image?: { "#text": string; size: string }[];
  duration?: number;
  playcount?: string;
}
