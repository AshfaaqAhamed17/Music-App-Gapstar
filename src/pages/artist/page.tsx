import { useArtistStore } from "@/store/artist-store";
import ArtistListingComponent from "../../components/common/artist-listing";
import { Box, Heading, VStack } from "@chakra-ui/react";
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
    <VStack gap={12}>
      <Box py={2} w="full">
        <Heading size="xl" mb={8}>
          Most popular
        </Heading>
        <ArtistListingComponent artists={mostPopular} />
      </Box>

      <Box py={2} w="full">
        <Heading size="xl" mb={8}>
          All artists
        </Heading>
        <ArtistListingComponent artists={allArtists} />
      </Box>
    </VStack>
  );
}
