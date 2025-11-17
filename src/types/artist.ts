export interface ArtistImage {
  "#text": string;
  size: string;
}

export interface Artist {
  name: string;
  playcount: string;
  listeners: string;
  mbid?: string;
  url: string;
  streamable: string;
  image: ArtistImage[];
}

export interface ArtistsResponse {
  artists: {
    artist: Artist[];
  };
}
