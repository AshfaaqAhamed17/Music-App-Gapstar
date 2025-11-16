import ArtistTile from "../../common/artist-tile";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";

export default function PopularArtist() {
  const artists = Array.from({ length: 5 }).map((_, i) => ({
    id: `artist-${i + 1}`,
    artistName: `Artist ${i + 1}`,
    imageUrl: `https://picsum.photos/seed/artist${i + 1}/300/300`,
  }));

  return (
    <Box
      overflowX="auto"
      py={2}
      sm={{ WebkitOverflowScrolling: "touch" }}
      w="full"
    >
      <Heading size="xl" mb={8}>
        Most popular
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
