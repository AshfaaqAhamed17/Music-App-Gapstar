import DetailsHeader from "@/components/common/details-header";
import SongsListingComponent from "@/components/common/songs-listing";
import { Box, VStack } from "@chakra-ui/react";

export default function Favourites() {
  return (
    <VStack gap={12} align="start">
      <Box
        h="350px"
        w="full"
        background="linear-gradient(180deg, rgba(255, 0, 213, 0.29) 0%, rgba(255, 0, 213, 0) 99.99%)"
        position="absolute"
        top="0"
        left="0"
        overflowX="hidden"
      />

      <DetailsHeader isFavourites />
      <SongsListingComponent count={50} />
    </VStack>
  );
}
