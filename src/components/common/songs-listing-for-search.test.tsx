import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import SongsListingForSearchComponent from "./songs-listing-for-search";

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

const mockAddFavorite = vi.fn();
const mockRemoveFavorite = vi.fn();
const mockIsFavorite = vi.fn();
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
    addFavorite: mockAddFavorite,
    removeFavorite: mockRemoveFavorite,
    isFavorite: mockIsFavorite,
  }),
}));

describe("SongsListingForSearchComponent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsFavorite.mockReturnValue(false);
  });

  const mockTracks = [
    {
      name: "Search Track 1",
      artist: {
        name: "Search Artist 1",
        mbid: "",
        url: "",
      },
      url: "https://example.com/track1",
      listeners: "100000",
      mbid: "track-1",
      image: [
        { "#text": "https://example.com/img1.jpg", size: "small" },
        { "#text": "https://example.com/img1-med.jpg", size: "medium" },
        { "#text": "https://example.com/img1-large.jpg", size: "large" },
      ],
      duration: "",
      playcount: "",
      streamable: {
        fulltrack: "",
        "#text": "",
      },
      "@attr": {
        rank: 0,
      },
    },
    {
      name: "Search Track 2",
      artist: {
        name: "Search Artist 2",
        mbid: "",
        url: "",
      },
      url: "https://example.com/track2",
      listeners: "50000",
      mbid: "track-2",
      image: [],
      duration: "",
      playcount: "",
      streamable: {
        fulltrack: "",
        "#text": "",
      },
      "@attr": {
        rank: 0,
      },
    },
  ];

  it("adds track to favorites when star button is clicked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <SongsListingForSearchComponent tracks={mockTracks} />
        </MemoryRouter>
      </ChakraProvider>
    );

    const favoriteButtons = screen.getAllByLabelText(/Favorite/);
    fireEvent.click(favoriteButtons[0]);

    expect(mockAddFavorite).toHaveBeenCalledWith({
      name: "Search Track 1",
      artist: {
        name: "Search Artist 1",
        mbid: "",
        url: "",
      },
      url: mockTracks[0].url,
      image: mockTracks[0].image,
      duration: "",
      playcount: "",
      streamable: {
        fulltrack: "",
        "#text": "",
      },
      "@attr": {
        rank: 0,
      },
    });
  });

  it("removes track from favorites when already favorited", () => {
    mockIsFavorite.mockReturnValue(true);

    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <SongsListingForSearchComponent tracks={mockTracks} />
        </MemoryRouter>
      </ChakraProvider>
    );

    const favoriteButtons = screen.getAllByLabelText(/Favorite/);
    fireEvent.click(favoriteButtons[0]);

    expect(mockRemoveFavorite).toHaveBeenCalledWith(
      "Search Track 1",
      "Search Artist 1"
    );
  });

  it("renders multiple tracks", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <SongsListingForSearchComponent tracks={mockTracks} />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("Search Track 1")).toBeInTheDocument();
    expect(screen.getByText("Search Track 2")).toBeInTheDocument();
  });

  it("handles tracks without images", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <SongsListingForSearchComponent tracks={mockTracks} />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("Search Track 2")).toBeInTheDocument();
  });
});
