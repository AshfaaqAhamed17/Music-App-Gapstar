import type { AlbumTrack } from "./album";

export interface TopTracksResponse {
  toptracks: {
    track: AlbumTrack[];

  };
}
export interface ArtistResponse {
  artist: Artist;
}

export interface Artist {
  name: string;
  mbid: string;
  url: string;
  image: ArtistImage[];
  streamable: string;
  ontour: string;
  stats: ArtistStats;
  similar: SimilarArtists;
  tags: ArtistTags;
  bio: ArtistBio;
}

export interface ArtistImage {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge" | "mega" | "";
}

export interface ArtistStats {
  listeners: string;
  playcount: string;
}

export interface SimilarArtists {
  artist: SimilarArtist[];
}

export interface SimilarArtist {
  name: string;
  url: string;
  image: ArtistImage[];
}

export interface ArtistTags {
  tag: ArtistTag[];
}

export interface ArtistTag {
  name: string;
  url: string;
}

export interface ArtistBio {
  links: BioLinks;
  published: string;
  summary: string;
  content: string;
}

export interface BioLinks {
  link: BioLink;
}

export interface BioLink {
  "#text": string;
  rel: string;
  href: string;
}
