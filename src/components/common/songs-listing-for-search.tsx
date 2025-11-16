import {
  Avatar,
  Button,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MoreHorizontal, Star } from "lucide-react";

const DUMMY_SONGS = (count: number) =>
  Array.from({ length: count }).map((_, i) => {
    const playsNumber = 1_000_000 * (i + 1) + (i + 1) * 12345;
    return {
      id: `song-${i + 1}`,
      trackName: `Track ${i + 1}`,
      artistName: `Artist ${i + 1}`,
      plays: playsNumber.toLocaleString(),
      imageUrl: `https://picsum.photos/seed/song${i + 1}/300/300`,
    };
  });

interface SongsListingForSearchProps {
  count: number;
}

export default function SongsListingForSearchComponent({
  count,
}: SongsListingForSearchProps) {
  const songs = DUMMY_SONGS(count);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      gapX={10}
      // px={{ base: 6, xl: 2 }}
    >
      {songs.map((s) => (
        <HStack
          key={s.id}
          align="center"
          gap={4}
          w="full"
          borderTop="1px solid"
          borderColor="border.default"
          py={4}
        >
          <HStack align="center" gap={4} flex="1" minW={0}>
            <Avatar.Root
              shape="rounded"
              size="lg"
              boxSize="44px"
              borderRadius="full"
            >
              <Avatar.Fallback name={s.artistName} />
              <Avatar.Image src={s.imageUrl} />
            </Avatar.Root>

            <VStack w="full" gap={1} align="start" px={2} minW={0}>
              <Text
                fontWeight="semibold"
                fontSize="md"
                textAlign="start"
                truncate
              >
                {s.trackName}
              </Text>
              <Text fontSize="sm" textAlign="start" color="muted" truncate>
                {s.artistName}
              </Text>
            </VStack>
          </HStack>

          <Flex gap={1} minW="300px" justify="end">
            <Button
              variant="ghost"
              size="sm"
              aria-label={`Favorite ${s.trackName}`}
            >
              <Star size={16} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              aria-label={`More for ${s.trackName}`}
            >
              <MoreHorizontal size={16} />
            </Button>
          </Flex>
        </HStack>
      ))}
    </SimpleGrid>
  );
}
