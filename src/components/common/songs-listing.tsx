import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
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

interface SongsListingProps {
  count: number;
}

export default function SongsListingComponent({ count }: SongsListingProps) {
  const songs = DUMMY_SONGS(count);

  return (
    <VStack gap={4} w="full" align="stretch">
      {songs.map((s) => (
        <HStack key={s.id} align="center" gap={4} w="full">
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

          <Box minW="300px">
            <Text fontSize="sm" textAlign="end" color="muted">
              {s.plays} plays
            </Text>
          </Box>

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
    </VStack>
  );
}
