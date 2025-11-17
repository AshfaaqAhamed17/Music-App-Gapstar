import {
  Avatar,
  Button,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { MoreHorizontal, Star } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites-store";
import { toaster } from "../../lib/toaster";
import { splitArtists } from "@/utils/text-formatter";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleFavoriteClick = (track: Track) => {
    if (isFavorite(track.name, track.artist)) {
      removeFavorite(track.name, track.artist);
      toaster.create({
        title: "Removed from favorites",
        type: "info",
      });
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
      toaster.create({
        title: "Added to favorites",
        type: "success",
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
                <HStack gap={1} overflow="hidden">
                  {splitArtists(s.artist).map((artist, index) => (
                    <HStack key={index} gap={1}>
                      <Text
                        key={index}
                        fontSize="sm"
                        textAlign="start"
                        color="muted"
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                        onClick={(e) => {
                          {
                            e.stopPropagation();
                            navigate(`/artist/${encodeURIComponent(artist)}`);
                          }
                        }}
                        whiteSpace="nowrap"
                      >
                        {isMobile && artist.length > 5
                          ? artist.slice(0, 5) + "..."
                          : artist}
                        {index < splitArtists(s.artist).length - 1 && ","}
                      </Text>
                    </HStack>
                  ))}
                </HStack>
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
