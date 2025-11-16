import DetailsHeader from "@/components/common/details-header";
import SongsListingComponent from "@/components/common/songs-listing";
import { VStack } from "@chakra-ui/react";

export default function AlbumDetail() {
  return (
    <VStack gap={12} align="start">
      <DetailsHeader />
      <SongsListingComponent count={15} />
    </VStack>
  );
}
