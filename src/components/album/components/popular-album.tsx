import AlbumTile from "../../common/album-tile";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";

export default function PopularAlbum() {
  const albums = Array.from({ length: 5 }).map((_, i) => ({
    id: `album-${i + 1}`,
    artistName: `Artist ${i + 1}`,
    albumName: `Album ${i + 1}`,
    imageUrl: `https://picsum.photos/seed/artist${i + 1}/300/300`,
  }));

  return (
    <Box py={2} w="full">
      <Heading size="xl" mb={8}>
        Most popular
      </Heading>
      <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} gap={5}>
        {albums.map((a) => (
          <AlbumTile
            key={a.id}
            imageUrl={a.imageUrl}
            albumName={a.albumName}
            artistName={a.artistName}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
