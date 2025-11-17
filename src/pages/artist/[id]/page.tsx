import { useEffect } from "react";
import ArtistDetailsTabSection from "../../../components/artist/components/artist-details-tab-section";
import ArtistDetailsHeader from "../../../components/artist/components/artist-details-header";
import SongsListingComponent from "../../../components/common/songs-listing";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useArtistStore } from "@/store/artist-store";
import Loader from "@/components/common/loader";

export default function ArtistDetail() {
  const params = useParams<{ name: string }>();
  const fetchArtistDetails = useArtistStore((s) => s.fetchArtistDetails);
  const artistInfo = useArtistStore((s) => s.artistInfo);
  const artistTopTracks = useArtistStore((s) => s.artistTopTracks);
  const isLoading = useArtistStore((s) => s.isLoading);
  const isArtistLoading = useArtistStore((s) => s.isArtistLoading);

  useEffect(() => {
    fetchArtistDetails(params.name as string);
  }, [fetchArtistDetails, params.name]);

  if (isLoading || isArtistLoading) {
    return <Loader />;
  }

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
      <ArtistDetailsHeader artistInfo={artistInfo} />
      <Box w="full" zIndex={1}>
        <VStack align="start" gap={4} w="full">
          <Text fontWeight="bold" fontSize="2xl" textAlign="start">
            Popular Songs
          </Text>

          <SongsListingComponent tracks={artistTopTracks.slice(0, 5)} />
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
