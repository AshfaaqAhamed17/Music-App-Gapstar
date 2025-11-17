import type { TopTracksResponse } from "@/types/artist-details";
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
import { useFavoritesStore } from "@/store/favorites-store";

interface SongsListingComponentProps {
  tracks: TopTracksResponse["toptracks"]["track"];
}

export default function SongsListingComponent({
  tracks,
}: SongsListingComponentProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const handleFavoriteClick = (track: (typeof tracks)[0]) => {
    if (isFavorite(track.name, track.artist.name)) {
      removeFavorite(track.name, track.artist.name);
    } else {
      addFavorite({
        name: track.name,
        artist: track.artist,
        url: track.url,
        image: track.image,
        duration: track.duration,
        playcount: track.playcount,
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
    <VStack gap={3} w="full" align="stretch">
      {tracks.map((s, idx) => {
        const favorite = isFavorite(s.name, s.artist.name);

        return (
          <HStack
            key={idx}
            align="center"
            gap={4}
            w="full"
            borderTop={idx === 0 ? "none" : "1px solid"}
            borderColor="border.default"
            pt={3}
          >
            <HStack align="center" gap={4} flex="1" minW={0}>
              <Avatar.Root
                shape="rounded"
                size="lg"
                boxSize="44px"
                borderRadius="full"
              >
                <Avatar.Fallback name={s.artist.name} />
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
                  {s.artist.name}
                </Text>
              </VStack>
            </HStack>

            <Box minW="300px" display={{ base: "none", md: "block" }}>
              <Text fontSize="sm" textAlign="end" color="muted">
                {s.playcount
                  ? `${s.playcount} plays`
                  : s.duration
                  ? `${s.duration} secs`
                  : "----"}
              </Text>
            </Box>

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
    </VStack>
  );
}
