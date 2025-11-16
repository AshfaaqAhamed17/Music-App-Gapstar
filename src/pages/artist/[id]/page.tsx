import ArtistDetailsTabSection from "../../../components/artist/components/artist-details-tab-section";
import ArtistDetailsHeader from "../../../components/artist/components/artist-details-header";
import SongsListingComponent from "../../../components/common/songs-listing";
import { Box, Text, VStack } from "@chakra-ui/react";

export default function ArtistDetail() {
  return (
    <VStack gap={16} align="start">
      <Box
        h="275px"
        w="full"
        background="linear-gradient(180deg, rgba(255, 104, 0, 0.5) 0%, rgba(255, 104, 0, 0) 100%)"
        position="absolute"
        top="0"
        left="0"
        overflowX="hidden"
      />
      <ArtistDetailsHeader />
      <Box w="full" zIndex={1}>
        <VStack align="start" gap={4} w="full">
          <Text fontWeight="bold" fontSize="2xl" textAlign="start">
            Popular Songs
          </Text>

          <SongsListingComponent count={5} />
        </VStack>
      </Box>
      <VStack gap={4} align="start" w="full">
        <Text fontWeight="bold" fontSize="2xl" textAlign="start">
          Releases
        </Text>
        <ArtistDetailsTabSection />
      </VStack>
    </VStack>
  );
}
