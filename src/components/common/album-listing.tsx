import AlbumTile from "./album-tile";
import { SimpleGrid } from "@chakra-ui/react";

const DUMMY_ALBUMS = (count: number) =>
  Array.from({ length: count }).map((_, i) => {
    return {
      id: `album-${i + 1}`,
      artistName: `Artist ${i + 1}`,
      albumName: `Album ${i + 1}`,
      imageUrl: `https://picsum.photos/seed/artist${i + 1}/300/300`,
    };
  });

interface AlbumListingProps {
  count: number;
}

export default function AlbumListingComponent({ count }: AlbumListingProps) {
  const albums = DUMMY_ALBUMS(count);

  return (
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
  );
}
