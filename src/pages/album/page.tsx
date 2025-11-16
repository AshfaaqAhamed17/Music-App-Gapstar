import AlbumListingComponent from "../../components/common/album-listing";
import { Box, Heading, VStack } from "@chakra-ui/react";

export default function Album() {
  return (
    <VStack gap={12}>
      <Box py={2} w="full">
        <Heading size="xl" mb={8}>
          Most popular
        </Heading>
        <AlbumListingComponent count={5} />
      </Box>
      <Box py={2} w="full">
        <Heading size="xl" mb={8}>
          Recently Added
        </Heading>
        <AlbumListingComponent count={25} />
      </Box>
    </VStack>
  );
}
