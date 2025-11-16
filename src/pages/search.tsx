import { useEffect, useState } from "react";
import { Box, Heading, Text, VStack, Spinner } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import ArtistListingComponent from "../components/common/artist-listing";
import AlbumListingComponent from "../components/common/album-listing";
import SongsListingForSearchComponent from "../components/common/songs-listing-for-search";

// Minimal mocked dataset for demonstration/search UI
const MOCK_SONGS = [
  { id: "s1", title: "Shape of You", artist: "Ed Sheeran" },
  { id: "s2", title: "Blinding Lights", artist: "The Weeknd" },
  { id: "s3", title: "Levitating", artist: "Dua Lipa" },
  { id: "s4", title: "Yesterday", artist: "The Beatles" },
  { id: "s5", title: "Yesterday", artist: "The Be" },
  { id: "s6", title: "Yesterday", artist: "The atles" },
  { id: "s7", title: "Yesterday", artist: "The Bet" },
];

const MOCK_ALBUMS = [
  { id: "a1", title: "Divide", artist: "Ed Sheeran" },
  { id: "a2", title: "After Hours", artist: "The Weeknd" },
  { id: "a3", title: "Future Nostalgia", artist: "Dua Lipa" },
];

const MOCK_ARTISTS = [
  { id: "ar1", name: "Ed Sheeran" },
  { id: "ar2", name: "The Weeknd" },
  { id: "ar3", name: "Dua Lipa" },
  { id: "ar4", name: "The Beatles" },
  { id: "ar5", name: "The Week" },
  { id: "ar6", name: "The End" },
];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") || "").trim();
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState<typeof MOCK_SONGS>([]);
  const [albums, setAlbums] = useState<typeof MOCK_ALBUMS>([]);
  const [artists, setArtists] = useState<typeof MOCK_ARTISTS>([]);

  useEffect(() => {
    // console.log(q);
    // only perform the async (debounced) search when query is long enough
    if (!q || q.length < 2) {
      // do not call setState synchronously here — rendering will derive empty results
      return;
    }

    // setLoading(true);
    const t = setTimeout(() => {
      const qi = q.toLowerCase();
      setSongs(
        MOCK_SONGS.filter(
          (s) =>
            s.title.toLowerCase().includes(qi) ||
            s.artist.toLowerCase().includes(qi)
        )
      );
      setAlbums(
        MOCK_ALBUMS.filter(
          (a) =>
            a.title.toLowerCase().includes(qi) ||
            a.artist.toLowerCase().includes(qi)
        )
      );
      setArtists(
        MOCK_ARTISTS.filter((ar) => ar.name.toLowerCase().includes(qi))
      );
      setLoading(false);
    }, 250);

    return () => clearTimeout(t);
  }, [q]);

  // derive what to show without forcing state updates when q is short
  const displaySongs = q && q.length >= 2 ? songs : [];
  const displayAlbums = q && q.length >= 2 ? albums : [];
  const displayArtists = q && q.length >= 2 ? artists : [];
  const displayLoading = q && q.length >= 2 ? loading : false;

  return (
    <Box>
      <VStack align="stretch" gap={10}>
        <Text color="muted.700">
          {q ? `Results for "${q}"` : "Type at least 2 characters to search"}
        </Text>

        {displayLoading ? (
          <Box py={6} textAlign="center">
            <Spinner />
          </Box>
        ) : (
          <VStack align="stretch" gap={10}>
            <Box>
              <Heading size="sm" mb={2}>
                Songs
              </Heading>
              <Box gap={2}>
                {displaySongs.length ? (
                  <SongsListingForSearchComponent count={displaySongs.length} />
                ) : (
                  <Text color="muted.700">No songs found</Text>
                )}
              </Box>
            </Box>

            <Box>
              <Heading size="sm" mb={2}>
                Albums
              </Heading>
              <Box gap={2}>
                {displayAlbums.length ? (
                  <ArtistListingComponent count={displayAlbums.length} />
                ) : (
                  <Text color="muted.700">No albums found</Text>
                )}
              </Box>
            </Box>

            <Box>
              <Heading size="sm" mb={2}>
                Artists
              </Heading>
              <Box>
                {displayArtists.length ? (
                  <AlbumListingComponent count={displayArtists.length} />
                ) : (
                  <Text color="muted.700">No artists found</Text>
                )}
              </Box>
            </Box>
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
