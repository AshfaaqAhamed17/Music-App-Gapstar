import { useArtistStore } from "@/store/artist-store";
import ArtistListingComponent from "../../components/common/artist-listing";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import Loader from "@/components/common/loader";

export default function Artist() {
  const {
    allArtists,
    mostPopularArtists: mostPopular,
    fetchArtists,
    isArtistLoading,
    isLoading,
  } = useArtistStore();

  // Fetch artists on component mount
  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  if (isLoading || isArtistLoading) {
    return <Loader />;
  }

  return (
    <VStack gap={16} align="start">
      <VStack w="full" gap={6} alignItems="start">
        <Text fontWeight="bold" fontSize="2xl" textAlign="start">
          Most popular
        </Text>
        <Box py={2} w="full">
          <ArtistListingComponent artists={mostPopular} />
        </Box>
      </VStack>

      <VStack w="full" gap={6} alignItems="start">
        <Text fontWeight="bold" fontSize="2xl" textAlign="start">
          All artists
        </Text>
        <Box py={2} w="full">
          <ArtistListingComponent artists={allArtists} />
        </Box>
      </VStack>
    </VStack>
  );
}
