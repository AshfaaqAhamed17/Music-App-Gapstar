import ArtistDetailsTabSection from "../../../components/artist/components/artist-details-tab-section";
import ArtistDetailsHeader from "../../../components/artist/components/artist-details-header";
import SongsListingComponent from "../../../components/common/songs-listing";
import { Box, Text, VStack } from "@chakra-ui/react";

export default function ArtistDetail() {
  return (
    <VStack gap={12} align="start">
      <ArtistDetailsHeader />
      <Box w="full">
        <VStack align="start" gap={4} w="full">
          <Text fontWeight="bold" fontSize="2xl" textAlign="start">
            Popular Songs
          </Text>

          <SongsListingComponent count={5} />
        </VStack>
      </Box>
      <ArtistDetailsTabSection />
    </VStack>
  );
}
