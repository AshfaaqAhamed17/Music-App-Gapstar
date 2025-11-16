import AllArtist from "../components/artist/components/all-artist";
import PopularArtist from "../components/artist/components/popular-artist";
import { VStack } from "@chakra-ui/react";

export default function Artist() {
  return (
    <VStack gap={12}>
      <PopularArtist />
      <AllArtist />
    </VStack>
  );
}
