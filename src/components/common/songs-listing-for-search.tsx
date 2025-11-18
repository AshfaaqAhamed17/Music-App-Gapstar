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
import { useFavoriteHandler } from "@/hooks/use-favorite-handler";
import { splitArtists } from "@/utils/text-formatter";
import { useNavigate } from "react-router-dom";
import type { TopTracksResponse } from "@/types/artist-details";


interface SongsListingForSearchProps {
  tracks: TopTracksResponse["toptracks"]["track"];
}

export default function SongsListingForSearchComponent({
  tracks,
}: SongsListingForSearchProps) {
  const { handleFavoriteClick, isFavorite } = useFavoriteHandler();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gapX={10}>
      {tracks.map((s, idx) => {
        const favorite = isFavorite(s.name, s.artist.name);

        return (
          <HStack
            key={idx}
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
                <HStack gap={1} overflow="hidden">
                  {splitArtists(s.artist.name).map((artist, index) => (
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
                        {index < splitArtists(s.artist.name).length - 1 && ","}
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
