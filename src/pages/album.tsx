import PopularAlbum from "../components/album/components/popular-album";
import { VStack } from "@chakra-ui/react";
import AllAlbum from "../components/album/components/all-album";

export default function Album() {
  return (
    <VStack gap={12}>
      <PopularAlbum />
      <AllAlbum />
    </VStack>
  );
}
