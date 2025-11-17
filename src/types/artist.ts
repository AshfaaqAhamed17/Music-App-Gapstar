export interface ArtistImage {
  "#text": string;
  //   size: "small" | "medium" | "large" | "extralarge" | "mega";
  size: string;
}

export interface Artist {
  name: string;
  playcount: string; // API gives numeric fields as strings
  listeners: string;
  mbid?: string; // some objects do not have mbid
  url: string;
  streamable: string;
  image: ArtistImage[];
}

export interface ArtistsResponse {
  artists: {
    artist: Artist[];
  };
}
