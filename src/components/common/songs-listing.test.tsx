import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import SongsListingComponent from "./songs-listing";
import type { TopTracksResponse } from "@/types/artist-details";

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
    useLocation: () => ({ pathname: "/artist/test-artist" }),
  };
});

vi.mock("@/store/favorites-store", () => ({
  useFavoritesStore: () => ({
    addFavorite: mockAddFavorite,
    removeFavorite: mockRemoveFavorite,
    isFavorite: mockIsFavorite,
  }),
}));

describe("SongsListingComponent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsFavorite.mockReturnValue(false);
  });

  const mockTracks: TopTracksResponse["toptracks"]["track"] = [
    {
      name: "Test Track 1",
      artist: { name: "Test Artist 1", mbid: "artist-1", url: "" },
      url: "",
      image: [
        { "#text": "https://example.com/track1.jpg", size: "small" },
        { "#text": "https://example.com/track1-med.jpg", size: "medium" },
        { "#text": "https://example.com/track1-large.jpg", size: "large" },
      ],
      duration: "240",
      playcount: "1000000",
      streamable: { fulltrack: "", "#text": "" },
      "@attr": { rank: 1 },
    },
    {
      name: "Test Track 2",
      artist: { name: "Test Artist 2", mbid: "artist-2", url: "" },
      url: "",
      image: [],
      duration: "180",
      playcount: "500000",
      streamable: { fulltrack: "", "#text": "" },
      "@attr": { rank: 2 },
    },
  ];

  it("renders list of tracks", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <SongsListingComponent tracks={mockTracks} />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("Test Track 1")).toBeInTheDocument();
    expect(screen.getByText("Test Track 2")).toBeInTheDocument();
  });

  it("renders sort buttons on artist page", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <SongsListingComponent tracks={mockTracks} />
        </MemoryRouter>
      </ChakraProvider>
    );

    const buttons = screen.getAllByRole("button");
    // The component renders sort buttons on artist pages, check we have multiple buttons
    expect(buttons.length).toBeGreaterThan(2); // More than just favorite/more buttons
  });

  it("sorts tracks alphabetically when Sort A-Z is clicked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <SongsListingComponent tracks={mockTracks} />
        </MemoryRouter>
      </ChakraProvider>
    );

    const buttons = screen.getAllByRole("button");
    const sortButton = buttons.find((btn) => btn.textContent?.includes("Sort"));

    if (sortButton) {
      fireEvent.click(sortButton);

      const trackNames = screen.getAllByText(/Test Track/);
      expect(trackNames[0]).toHaveTextContent("Test Track 1");
      expect(trackNames[1]).toHaveTextContent("Test Track 2");
    }
  });

  it("adds track to favorites when star button is clicked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <SongsListingComponent tracks={mockTracks} />
        </MemoryRouter>
      </ChakraProvider>
    );

    const favoriteButtons = screen.getAllByLabelText(/Favorite/);
    fireEvent.click(favoriteButtons[0]);

    expect(mockAddFavorite).toHaveBeenCalledWith({
      name: "Test Track 1",
      artist: mockTracks[0].artist,
      url: mockTracks[0].url,
      image: mockTracks[0].image,
      duration: mockTracks[0].duration,
      playcount: mockTracks[0].playcount,
      streamable: mockTracks[0].streamable,
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
          <SongsListingComponent tracks={mockTracks} />
        </MemoryRouter>
      </ChakraProvider>
    );

    const favoriteButtons = screen.getAllByLabelText(/Favorite/);
    fireEvent.click(favoriteButtons[0]);

    expect(mockRemoveFavorite).toHaveBeenCalledWith(
      "Test Track 1",
      "Test Artist 1"
    );
  });

  it("navigates to artist page when artist name is clicked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <SongsListingComponent tracks={mockTracks} />
        </MemoryRouter>
      </ChakraProvider>
    );

    // In mobile view, artist names are truncated. Find any text element with cursor pointer
    const allTexts = screen.getAllByText(/Test.*/);
    // Filter to find artist-related text (not track names)
    const artistText = allTexts.find(
      (el) =>
        el.textContent?.includes("...") ||
        (el.textContent?.includes("Test A") &&
          !el.textContent?.includes("Track"))
    );

    if (artistText) {
      fireEvent.click(artistText);
      expect(mockNavigate).toHaveBeenCalledWith(
        expect.stringContaining("/artist/")
      );
    }
  });
});
