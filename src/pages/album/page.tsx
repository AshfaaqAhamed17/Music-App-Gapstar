import { useEffect } from "react";
import AlbumListingComponent from "../../components/common/album-listing";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useAlbumStore } from "@/store/album-store";
import Loader from "@/components/common/loader";

export default function Album() {
  const {
    allAlbums,
    mostPopularAlbum: mostPopular,
    fetchAlbums,
    isLoading,
  } = useAlbumStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <VStack align="start" gap={16}>
      <VStack w="full" gap={6} alignItems="start">
        <Text fontWeight="bold" fontSize="2xl" textAlign="start">
          Most popular
        </Text>
        <Box py={2} w="full">
          <AlbumListingComponent albums={mostPopular} />
        </Box>
      </VStack>
      <VStack w="full" gap={6} alignItems="start">
        <Text fontWeight="bold" fontSize="2xl" alignContent="start">
          Recently Added
        </Text>
        <Box py={2} w="full">
          <AlbumListingComponent albums={allAlbums} />
        </Box>
      </VStack>
    </VStack>
  );
}
