// import type { AlbumResponse } from "./album";

import type { AlbumTrack } from "./album";

// // ---- Artist Info ----
// export interface ArtistInfoResponse {
//   artist: {
//     name: string;
//     mbid: string;
//     url: string;
//     image: { "#text": string; size: string }[];
//     streamable: string;
//     ontour: string;
//     stats: {
//       listeners: string;
//       playcount: string;
//     };
//     similar: {
//       artist: {
//         name: string;
//         url: string;
//         image: { "#text": string; size: string }[];
//       }[];
//     };
//     bio?: {
//       summary: string;
//       content: string;
//     };
//     tags?: {
//       tag: { name: string; url: string }[];
//     };
//   };
// }

// // ---- Top Tracks ----
export interface TopTracksResponse {
  toptracks: {
    track: AlbumTrack[];
    // {
    //   name: string;
    //   playcount: string;
    //   listeners: string;
    //   url: string;
    //   image: { "#text": string; size: string }[];
    //   artist: { name: string; mbid: string; url: string };
    //   "@attr": { rank: number };
    // }
    // [];
  };
}

// // ---- Top Albums ----
// export interface TopAlbumsResponse {
//   topalbums: {
//     album: AlbumResponse[]; // Uses your existing AlbumResponse type
//   };
// }

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
