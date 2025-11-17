import type { Artist } from "@/types/artist";
import ArtistTile from "./artist-tile";
import { SimpleGrid } from "@chakra-ui/react";

interface ArtistListingComponentProps {
  artists: Artist[];
}

export default function ArtistListingComponent({
  artists,
}: ArtistListingComponentProps) {
  return (
    <SimpleGrid
      columns={{ base: 2, sm: 3, md: 4, lg: 6, xl: 10 }}
      gap={10}
      px={{ base: 6, xl: 2 }}
    >
      {artists.map((a) => (
        <ArtistTile key={a.mbid} imageUrl={a.image} artistName={a.name} />
      ))}
    </SimpleGrid>
  );
}
