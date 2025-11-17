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
import { useFavoritesStore } from "@/store/favorites-store";

interface Track {
  name: string;
  artist: string;
  url: string;
  listeners: string;
  mbid: string;
  image?: Array<{ "#text": string; size: string }>;
}

interface SongsListingForSearchProps {
  tracks: Track[];
}

export default function SongsListingForSearchComponent({
  tracks,
}: SongsListingForSearchProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const handleFavoriteClick = (track: Track) => {
    if (isFavorite(track.name, track.artist)) {
      removeFavorite(track.name, track.artist);
    } else {
      addFavorite({
        name: track.name,
        artist: {
          name: track.artist,
          mbid: "",
          url: "",
        },
        url: track.url,
        image: track.image || [],
        duration: "",
        playcount: "",
        streamable: {
          fulltrack: "",
          "#text": "",
        },
        "@attr": {
          rank: 0,
        },
      });
    }
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gapX={10}>
      {tracks.map((s, idx) => {
        const favorite = isFavorite(s.name, s.artist);

        return (
          <HStack
            key={`${s.mbid || s.name}-${idx}`}
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
                <Avatar.Fallback name={s.artist} />
                <Avatar.Image src={s.image?.[2]?.["#text"]} />
              </Avatar.Root>

              <VStack w="full" gap={1} align="start" px={2} minW={0}>
                <Text
                  fontWeight="semibold"
                  fontSize="md"
                  textAlign="start"
                  truncate
                >
                  {s.name}
                </Text>
                <Text fontSize="sm" textAlign="start" color="muted" truncate>
                  {s.artist}
                </Text>
              </VStack>
            </HStack>

            <Flex gap={1} minW="300px" justify="end">
              <Button
                variant="ghost"
                size="sm"
                aria-label={`Favorite ${s.name}`}
                onClick={() => handleFavoriteClick(s)}
                color={favorite ? "primary" : "inherit"}
              >
                <Star size={16} fill={favorite ? "currentColor" : "none"} />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                aria-label={`More for ${s.name}`}
              >
                <MoreHorizontal size={16} />
              </Button>
            </Flex>
          </HStack>
        );
      })}
    </SimpleGrid>
  );
}
