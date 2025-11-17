import type { AlbumResponse } from "@/types/album";
import AlbumTile from "./album-tile";
import { SimpleGrid } from "@chakra-ui/react";

export default function AlbumListingComponent({
  albums,
}: {
  albums: AlbumResponse[];
}) {
  return (
    <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 6 }} gap={5}>
      {albums.map((a) => (
        <AlbumTile
          key={a.mbid}
          imageUrl={a.image}
          albumName={a.name}
          artistName={a.artist.name}
        />
      ))}
    </SimpleGrid>
  );
}
