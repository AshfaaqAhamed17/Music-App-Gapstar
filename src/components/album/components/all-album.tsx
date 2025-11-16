import AlbumTile from "../../common/album-tile";
import { Box, SimpleGrid, Heading } from "@chakra-ui/react";

export default function AllAlbum({ page }: { page?: string }) {
  const albums = Array.from({ length: 35 }).map((_, i) => ({
    id: `album-${i + 1}`,
    artistName: `Artist ${i + 1}`,
    albumName: `Album ${i + 1}`,
    imageUrl: `https://picsum.photos/seed/artist${i + 1}/300/300`,
  }));

  return (
    <Box py={2} w="full">
      {page === "album" && (
        <Heading size="xl" mb={8}>
          All artists
        </Heading>
      )}

      <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} gap={10}>
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
