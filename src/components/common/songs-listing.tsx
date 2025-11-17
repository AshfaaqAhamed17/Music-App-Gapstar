import type { TopTracksResponse } from "@/types/artist-details";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { MoreHorizontal, Star } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites-store";
import { useLocation, useNavigate } from "react-router-dom";
import {
  formatDuration,
  formatNumber,
  splitArtists,
} from "@/utils/text-formatter";
import { toaster } from "../../components/ui/toaster";
import { useState, useMemo } from "react";

interface SongsListingComponentProps {
  tracks: TopTracksResponse["toptracks"]["track"];
}

export default function SongsListingComponent({
  tracks,
}: SongsListingComponentProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<"latest" | "name">("latest");
  const isMobile = useBreakpointValue({ base: true, md: false });

  const showAvatar = !location.pathname.startsWith("/album");
  const removeSorting = !location.pathname.startsWith("/artist");

  const sortedTracks = useMemo(() => {
    if (sortBy === "name") {
      return [...tracks].sort((a, b) => a.name.localeCompare(b.name));
    }
    return tracks;
  }, [tracks, sortBy]);

  const handleFavoriteClick = (track: (typeof tracks)[0]) => {
    if (isFavorite(track.name, track.artist.name)) {
      removeFavorite(track.name, track.artist.name);
      toaster.create({
        title: "Removed from favorites",
        type: "info",
      });
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
      toaster.create({
        title: "Added to favorites",
        type: "info",
      });
    }
  };

  return (
    <VStack gap={2} w="full" align="stretch">
      {removeSorting && (
        <HStack gap={2}>
          <Button
            aria-label="Latest"
            onClick={() => setSortBy("latest")}
            border="1px solid"
            borderColor="border.default"
            borderRadius="full"
            backgroundColor={sortBy === "latest" ? "bg.subtle" : "bg.surface"}
            variant="outline"
            zIndex={10}
            p={0}
            width="100px"
          >
            Latest
          </Button>
          <Button
            aria-label="Sort A-Z"
            onClick={() => setSortBy("name")}
            border="1px solid"
            borderColor="border.default"
            borderRadius="full"
            backgroundColor={sortBy === "name" ? "bg.subtle" : "bg.surface"}
            variant="outline"
            zIndex={10}
            p={0}
            width="100px"
          >
            Sort A-Z
          </Button>
        </HStack>
      )}
      {sortedTracks.map((s, idx) => {
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
              {showAvatar && (
                <Avatar.Root
                  shape="rounded"
                  size="lg"
                  boxSize="44px"
                  borderRadius="full"
                >
                  <Avatar.Fallback name={s.artist.name} />
                  <Avatar.Image src={s.image?.[2]?.["#text"]} />
                </Avatar.Root>
              )}
              <VStack w="full" gap={1} align="start" px={2} minW={0}>
                <Text
                  fontWeight="semibold"
                  fontSize="md"
                  textAlign="start"
                  truncate
                >
                  {isMobile && s.name.length > 20
                    ? s.name.slice(0, 20) + "..."
                    : s.name}
                </Text>

                <HStack gap={1} overflow="hidden">
                  {splitArtists(s.artist.name).map((artist, index) => (
                    <Text
                      key={index}
                      fontSize="sm"
                      textAlign="start"
                      color="muted"
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/artist/${encodeURIComponent(artist)}`);
                      }}
                      whiteSpace="nowrap"
                    >
                      {isMobile && artist.length > 5
                        ? artist.slice(0, 5) + "..."
                        : artist}
                      {index < splitArtists(s.artist.name).length - 1 && ","}
                    </Text>
                  ))}
                </HStack>
              </VStack>
            </HStack>

            <Box minW="200px" display={{ base: "none", md: "block" }}>
              {s.playcount && (
                <Text fontSize="sm" textAlign="end" color="muted">
                  {formatNumber(s.playcount)} plays
                </Text>
              )}
            </Box>

            <Box minW="200px" display={{ base: "none", md: "block" }}>
              {s.duration && (
                <Text fontSize="sm" textAlign="end" color="muted">
                  {formatDuration(s.duration)}
                </Text>
              )}
            </Box>

            <Flex gap={1} minW="200px" justify="end">
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
