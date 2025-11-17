import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import ArtistTile from "./artist-tile";
import type { ArtistImage } from "@/types/artist";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ArtistTile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockImages: ArtistImage[] = [
    { "#text": "https://example.com/small.jpg", size: "small" },
    { "#text": "https://example.com/medium.jpg", size: "medium" },
    { "#text": "https://example.com/large.jpg", size: "large" },
  ];

  it("renders artist name", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <ArtistTile imageUrl={mockImages} artistName="Test Artist" />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("Test Artist")).toBeInTheDocument();
  });

  it("navigates to artist page when clicked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <ArtistTile imageUrl={mockImages} artistName="Test Artist" />
        </MemoryRouter>
      </ChakraProvider>
    );

    const artistTile = screen.getByText("Test Artist");
    fireEvent.click(artistTile);

    expect(mockNavigate).toHaveBeenCalledWith("/artist/Test%20Artist");
  });

  it("handles empty image array", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <ArtistTile imageUrl={[]} artistName="Test Artist" />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("Test Artist")).toBeInTheDocument();
  });
});
