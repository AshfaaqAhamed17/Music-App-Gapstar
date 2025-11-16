export interface AlbumResponse {
  artist: string;
  mbid: string;
  tags: AlbumTags;
  playcount: string;
  image: AlbumImage[];
  tracks: AlbumTracks;
  url: string;
  name: string;
  listeners: string;
  wiki?: AlbumWiki;
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
  duration: number;
  url: string;
  name: string;
  "@attr": {
    rank: number;
  };
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
