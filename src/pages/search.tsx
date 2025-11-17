import { useEffect } from "react";
import { Box, Text, VStack, Spinner } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import ArtistListingComponent from "../components/common/artist-listing";
import AlbumListingComponent from "../components/common/album-listing";
import SongsListingForSearchComponent from "../components/common/songs-listing-for-search";
import { useSearchStore } from "../store/searchStore";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") || "").trim();

  const { tracks, albums, artists, loading, performSearch } = useSearchStore();

  useEffect(() => {
    if (!q || q.length < 2) {
      return;
    }

    const timer = setTimeout(() => {
      performSearch(q);
    }, 300);

    return () => clearTimeout(timer);
  }, [q, performSearch]);

  const displaySongs = q && q.length >= 2 ? tracks : [];
  const displayAlbums = q && q.length >= 2 ? albums : [];
  const displayArtists = q && q.length >= 2 ? artists : [];
  const displayLoading = q && q.length >= 2 ? loading : false;

  return (
    <Box>
      <VStack align="stretch" gap={10}>
        {displayLoading ? (
          <Box py={6} textAlign="center">
            <Spinner />
          </Box>
        ) : (
          <VStack align="stretch" gap={10}>
            <VStack align="stretch" gap={6}>
              <Text fontWeight="bold" fontSize="2xl" textAlign="start">
                Songs
              </Text>
              <Box>
                {displaySongs.length ? (
                  <SongsListingForSearchComponent tracks={displaySongs} />
                ) : (
                  <Text color="muted.700">No songs found</Text>
                )}
              </Box>
            </VStack>

            <VStack align="stretch" gap={6}>
              <Text fontWeight="bold" fontSize="2xl" textAlign="start">
                Artists
              </Text>
              <Box>
                {displayArtists.length ? (
                  <ArtistListingComponent artists={displayArtists} />
                ) : (
                  <Text color="muted.700">No artists found</Text>
                )}
              </Box>
            </VStack>

            <VStack align="stretch" gap={6}>
              <Text fontWeight="bold" fontSize="2xl" textAlign="start">
                Albums
              </Text>
              <Box>
                {displayAlbums.length ? (
                  <AlbumListingComponent albums={displayAlbums} />
                ) : (
                  <Text color="muted.700">No albums found</Text>
                )}
              </Box>
            </VStack>
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
