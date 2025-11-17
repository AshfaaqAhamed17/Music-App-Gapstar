import AlbumTile from "@/components/common/album-tile";
import TopTracks from "../components/home/top-tracks";
import { VStack, Box, Text, Stack } from "@chakra-ui/react";
import { useAlbumStore } from "@/store/album-store";
import { useEffect } from "react";
import AlbumListingComponent from "@/components/common/album-listing";
import Loader from "@/components/common/loader";
import ArtistListingComponent from "@/components/common/artist-listing";
import { useArtistStore } from "@/store/artist-store";

export default function Home() {
  const { mostPopularAlbum, fetchAlbums, isLoading } = useAlbumStore();
  const { mostPopularArtists, fetchArtists, isArtistLoading } =
    useArtistStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  if (isLoading || isArtistLoading) {
    return <Loader />;
  }

  return (
    <VStack align="start" gap={16}>
      <Stack
        direction={{ base: "column", md: "row" }}
        gap={10}
        align="start"
        w="full"
      >
        <VStack w={{ base: "full", md: "4/5" }} align="start" gap={6}>
          <Text fontWeight="bold" fontSize="2xl" textAlign="start">
            Top tracks this week{" "}
          </Text>
          <TopTracks />
        </VStack>

        <VStack
          align="stretch"
          flex={1}
          gap={6}
          h="full"
          w={{ base: "full", md: "1/5" }}
        >
          <Text fontWeight="bold" fontSize="2xl" textAlign="start">
            Album of the day
          </Text>

          <Box bg="bg.subtle" p={4} pb={6} borderRadius="2xl" h="full">
            {mostPopularAlbum[0] && (
              <AlbumTile
                imageUrl={mostPopularAlbum[0].image}
                albumName={mostPopularAlbum[0].name}
                artistName={mostPopularAlbum[0].artist.name}
              />
            )}
          </Box>
        </VStack>
      </Stack>

      <VStack w="full" gap={6} alignItems="start">
        <Text fontWeight="bold" fontSize="2xl" textAlign="start">
          Top albums this week
        </Text>
        <Box py={2} w="full">
          <AlbumListingComponent albums={mostPopularAlbum} />
        </Box>
      </VStack>

      <VStack w="full" gap={6} alignItems="start">
        <Text fontWeight="bold" fontSize="2xl" textAlign="start">
          Top artists
        </Text>
        <Box w="full">
          <ArtistListingComponent artists={mostPopularArtists} />
        </Box>
      </VStack>
    </VStack>
  );
}
