import ArtistTile from "../../common/artist-tile";
import { Box, SimpleGrid, Heading } from "@chakra-ui/react";

export default function AllArtist() {
  // dummy data: 20 artists
  const artists = Array.from({ length: 35 }).map((_, i) => ({
    id: `artist-${i + 1}`,
    artistName: `Artist ${i + 1}`,
    imageUrl: `https://picsum.photos/seed/artist${i + 1}/300/300`,
  }));

  return (
    <Box overflowX="auto" py={2} w="full">
      <Heading size="xl" mb={8}>
        All artists
      </Heading>

      <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 10 }} gap={10}>
        {artists.map((a) => (
          <ArtistTile
            key={a.id}
            imageUrl={a.imageUrl}
            artistName={a.artistName}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
