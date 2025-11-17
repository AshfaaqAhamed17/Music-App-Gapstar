export interface AlbumResponse {
  name: string;
  mbid: string;
  url: string;
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  image: AlbumImage[];
  "@attr": {
    rank: string;
  };
}

export interface AlbumsApiResponse {
  albums: {
    album: AlbumResponse[];
    "@attr": {
      tag: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}

export interface AlbumTags {
  tag: AlbumTag[];
}

export interface AlbumTag {
  url: string;
  name: string;
}

export interface AlbumImage {
  size: string;
  "#text": string;
}

export interface AlbumTracks {
  track: AlbumTrack[];
}

export interface AlbumTrack {
  streamable: {
    fulltrack: string;
    "#text": string;
  };
  image?: { "#text": string; size: string }[];
  duration: string;
  url: string;
  name: string;
  "@attr": {
    rank: number;
  };
  playcount?: string;
  artist: {
    url: string;
    name: string;
    mbid: string;
  };
}

export interface AlbumWiki {
  published: string;
  summary: string;
  content: string;
}

export interface AlbumDetailsResponse {
  album: {
    name: string;
    artist: string;
    mbid: string;
    url: string;
    image: AlbumImage[];
    listeners: string;
    playcount: string;
    tracks: AlbumTracks;
    tags: AlbumTags;
    wiki?: AlbumWiki;
  };
}
