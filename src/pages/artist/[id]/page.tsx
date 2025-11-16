import ArtistDetailsOther from "@/components/artist/components/artist-details-other";
import ArtistDetailsHeader from "../../../components/artist/components/artist-details-header";
import ArtistDetailsSongs from "../../../components/artist/components/artist-details-popular-songs";
import { VStack } from "@chakra-ui/react";

export default function ArtistDetail() {
  return (
    <VStack gap={12} align="start">
      <ArtistDetailsHeader />
      <ArtistDetailsSongs page="artist" />
      <ArtistDetailsOther />
    </VStack>
  );
}
