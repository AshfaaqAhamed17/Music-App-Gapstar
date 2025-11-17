import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import AlbumTile from "./album-tile";
import type { AlbumImage } from "@/types/album";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("AlbumTile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockImages: AlbumImage[] = [
    { "#text": "https://example.com/small.jpg", size: "small" },
    { "#text": "https://example.com/large.jpg", size: "large" },
    { "#text": "https://example.com/extralarge.jpg", size: "extralarge" },
  ];

  it("renders album name and artist name", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <AlbumTile
            imageUrl={mockImages}
            albumName="Test Album"
            artistName="Test Artist"
          />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("Test Album")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
  });

  it("navigates to album page when tile is clicked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <AlbumTile
            imageUrl={mockImages}
            albumName="Test Album"
            artistName="Test Artist"
          />
        </MemoryRouter>
      </ChakraProvider>
    );

    const albumText = screen.getByText("Test Album");
    fireEvent.click(albumText);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/album/Test%20Artist/Test%20Album"
    );
  });

  it("navigates to artist page when artist name is clicked", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <MemoryRouter>
          <AlbumTile
            imageUrl={mockImages}
            albumName="Test Album"
            artistName="Test Artist"
          />
        </MemoryRouter>
      </ChakraProvider>
    );

    const artistName = screen.getByText("Test Artist");
    fireEvent.click(artistName);

    expect(mockNavigate).toHaveBeenCalledWith("/artist/Test%20Artist");
  });

});
