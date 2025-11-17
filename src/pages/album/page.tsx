import { useEffect } from "react";
import AlbumListingComponent from "../../components/common/album-listing";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { useAlbumStore } from "@/store/album-store";
import Loader from "@/components/common/loader";

export default function Album() {
  const { allAlbums, mostPopular, fetchAlbums, isLoading } = useAlbumStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <VStack gap={12}>
      <Box py={2} w="full">
        <Heading size="xl" mb={8}>
          Most popular
        </Heading>
        <AlbumListingComponent albums={mostPopular} />
      </Box>
      <Box py={2} w="full">
        <Heading size="xl" mb={8}>
          Recently Added
        </Heading>
        <AlbumListingComponent albums={allAlbums} />
      </Box>
    </VStack>
  );
}
