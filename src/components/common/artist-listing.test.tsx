import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import ArtistListingComponent from "./artist-listing";
import type { Artist } from "@/types/artist";

const mockArtists: Artist[] = [
  {
    mbid: "artist-1",
    name: "Test Artist 1",
    image: [{ "#text": "https://example.com/artist1.jpg", size: "medium" }],
    url: "",
    streamable: "",
    playcount: "",
    listeners: "",
  },
  {
    mbid: "artist-2",
    name: "Test Artist 2",
    image: [{ "#text": "https://example.com/artist2.jpg", size: "medium" }],
    url: "",
    streamable: "",
    playcount: "",
    listeners: "",
  },
];

describe("ArtistListingComponent", () => {
  it("renders a list of artists", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <ArtistListingComponent artists={mockArtists} />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("Test Artist 1")).toBeInTheDocument();
    expect(screen.getByText("Test Artist 2")).toBeInTheDocument();
  });

  it("renders empty grid when artists array is empty", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <ArtistListingComponent artists={[]} />
        </MemoryRouter>
      </ChakraProvider>
    );

    const artistTiles = screen.queryAllByText(/Test Artist/);
    expect(artistTiles).toHaveLength(0);
  });

  it("renders correct number of artist tiles", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <ArtistListingComponent artists={mockArtists} />
        </MemoryRouter>
      </ChakraProvider>
    );

    const artists = screen.getAllByText(/Test Artist/);
    expect(artists).toHaveLength(2);
  });
});
