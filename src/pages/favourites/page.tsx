import DetailsHeader from "@/components/common/details-header";
import SongsListingComponent from "@/components/common/songs-listing";
import { VStack } from "@chakra-ui/react";

export default function Favourites() {
  return (
    <VStack gap={12} align="start">
      <DetailsHeader isFavourites />
      <SongsListingComponent count={50} />
    </VStack>
  );
}
