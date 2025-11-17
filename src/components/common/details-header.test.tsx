import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import DetailsHeader from "./details-header";
import type { AlbumDetailsResponse } from "@/types/album";

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@/store/favorites-store", () => ({
  useFavoritesStore: () => ({
    favorites: [{ id: "1" }, { id: "2" }],
  }),
}));

describe("DetailsHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockAlbum: AlbumDetailsResponse["album"] = {
    name: "Test Album",
    artist: "Test Artist",
    image: [
      { "#text": "https://example.com/small.jpg", size: "small" },
      { "#text": "https://example.com/extralarge.jpg", size: "extralarge" },
    ],
    tracks: {
      track: [
        {
          name: "Track 1",
          duration: "180",
          url: "",
          streamable: { "#text": "", fulltrack: "" },
          artist: { name: "", mbid: "", url: "" },
          "@attr": { rank: 1 },
        },
        {
          name: "Track 2",
          duration: "200",
          url: "",
          streamable: { "#text": "", fulltrack: "" },
          artist: { name: "", mbid: "", url: "" },
          "@attr": { rank: 2 },
        },
      ],
    },
    mbid: "",
    url: "",
    listeners: "",
    playcount: "",
    tags: { tag: [] },
    wiki: { published: "", summary: "", content: "" },
  };

  it("renders album details correctly", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <DetailsHeader selectedAlbum={mockAlbum} />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("Test Album")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.getByText("2 tracks")).toBeInTheDocument();
  });

  it("renders favorites mode correctly", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <DetailsHeader isFavourites={true} />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("My Favourites")).toBeInTheDocument();
    expect(screen.getByText("Created by me")).toBeInTheDocument();
    expect(screen.getByText("2 tracks")).toBeInTheDocument();
  });

  it("navigates to artist page when artist name is clicked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <DetailsHeader selectedAlbum={mockAlbum} />
        </MemoryRouter>
      </ChakraProvider>
    );

    const artistName = screen.getByText("Test Artist");
    fireEvent.click(artistName);

    expect(mockNavigate).toHaveBeenCalledWith("/artist/Test%20Artist");
  });

  it("renders Play button", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <DetailsHeader selectedAlbum={mockAlbum} />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("Play")).toBeInTheDocument();
  });

  it("handles album without tracks", () => {
    const albumWithoutTracks = { ...mockAlbum, tracks: { track: [] } };

    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <DetailsHeader selectedAlbum={albumWithoutTracks} />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("0 tracks")).toBeInTheDocument();
  });
});
