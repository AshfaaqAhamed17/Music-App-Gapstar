import ArtistTile from "./artist-tile";
import { SimpleGrid } from "@chakra-ui/react";

interface ArtistListingComponentProps {
  count: number;
}

export default function ArtistListingComponent({
  count,
}: ArtistListingComponentProps) {
  const artists = Array.from({ length: count }).map((_, i) => ({
    id: `artist-${i + 1}`,
    artistName: `Artist ${i + 1}`,
    imageUrl: `https://picsum.photos/seed/artist${i + 1}/300/300`,
  }));

  return (
    <SimpleGrid
      columns={{ base: 2, sm: 3, md: 4, lg: 6, xl: 10 }}
      gap={10}
      px={{ base: 6, xl: 2 }}
    >
      {artists.map((a) => (
        <ArtistTile
          key={a.id}
          imageUrl={a.imageUrl}
          artistName={a.artistName}
        />
      ))}
    </SimpleGrid>
  );
}
