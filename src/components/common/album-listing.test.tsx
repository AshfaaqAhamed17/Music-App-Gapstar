import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import AlbumListingComponent from "./album-listing";
import type { AlbumResponse } from "@/types/album";

const mockAlbums: AlbumResponse[] = [
  {
    mbid: "album-1",
    name: "Test Album 1",
    artist: { name: "Test Artist 1", mbid: "artist-1", url: "" },
    image: [{ "#text": "https://example.com/image1.jpg", size: "large" }],
    url: "",
    "@attr": {
      rank: "",
    },
  },
  {
    mbid: "album-2",
    name: "Test Album 2",
    artist: { name: "Test Artist 2", mbid: "artist-2", url: "" },
    image: [{ "#text": "https://example.com/image2.jpg", size: "medium" }],
    url: "",
    "@attr": {
      rank: "",
    },
  },
];

describe("AlbumListingComponent", () => {
  it("renders a list of albums", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <AlbumListingComponent albums={mockAlbums} />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("Test Album 1")).toBeInTheDocument();
    expect(screen.getByText("Test Artist 1")).toBeInTheDocument();
    expect(screen.getByText("Test Album 2")).toBeInTheDocument();
    expect(screen.getByText("Test Artist 2")).toBeInTheDocument();
  });

  it("renders empty grid when albums array is empty", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <AlbumListingComponent albums={[]} />
        </MemoryRouter>
      </ChakraProvider>
    );

    const albumTiles = screen.queryAllByText(/Test Album/);
    expect(albumTiles).toHaveLength(0);
  });

  it("renders correct number of album tiles", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <AlbumListingComponent albums={mockAlbums} />
        </MemoryRouter>
      </ChakraProvider>
    );

    const albums = screen.getAllByText(/Test Album/);
    expect(albums).toHaveLength(2);
  });
});
