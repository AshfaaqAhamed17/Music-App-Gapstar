import type { AlbumDetailsResponse } from "@/types/album";
import { Avatar, Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavoritesStore } from "@/store/favorites-store";

export default function DetailsHeader({
  selectedAlbum,
  isFavourites = false,
}: {
  selectedAlbum?: AlbumDetailsResponse["album"] | null;
  isFavourites?: boolean;
}) {
  const navigate = useNavigate();
  const { favorites } = useFavoritesStore();

  const metaItems = isFavourites
    ? ["Created by me", `${favorites.length} tracks`]
    : [
        selectedAlbum?.artist,
        `${selectedAlbum?.tracks?.track?.length || 0} tracks`,
      ];

  const selectCover = () => {
    if (!selectedAlbum) return "src/assets/user.jpg";

    if (!selectedAlbum?.image?.length) return undefined;
    const pref = ["extralarge", "mega", "large", "medium", "small"];
    for (const size of pref) {
      const item = selectedAlbum.image.find(
        (i) => i.size === size && i["#text"]
      );
      if (item && item["#text"]) return item["#text"];
    }
    return selectedAlbum.image.find((i) => i["#text"])?.["#text"];
  };

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      align={{ base: "start", md: "center" }}
      gap={4}
      w="full"
    >
      <Avatar.Root
        shape="rounded"
        size="lg"
        boxSize={{ base: "100px", md: "180px" }}
        borderRadius="full"
      >
        <Avatar.Fallback name="Random User" />
        <Avatar.Image src={selectCover()} />
      </Avatar.Root>

      <VStack w="full" gap={1} align="start" px={{ base: 0, md: 2 }}>
        <Text fontWeight="bold" fontSize="4xl">
          {isFavourites ? "My Favourites" : selectedAlbum?.name || "Album Name"}
        </Text>

        {/* Better metadata renderer */}
        <HStack wrap="wrap" gap={2} align="center">
          {metaItems.map((item, i) => (
            <HStack key={i} gap={2} align="center">
              <Text
                fontSize="sm"
                color="muted"
                cursor={i === 0 && !isFavourites ? "pointer" : "default"}
                _hover={
                  i === 0 && !isFavourites
                    ? { textDecoration: "underline" }
                    : {}
                }
                onClick={() => {
                  if (i === 0 && !isFavourites && selectedAlbum?.artist) {
                    navigate(
                      `/artist/${encodeURIComponent(selectedAlbum.artist)}`
                    );
                  }
                }}
              >
                {item}
              </Text>
              {i !== metaItems.length - 1 && (
                <Text fontSize="sm" color="muted">
                  •
                </Text>
              )}
            </HStack>
          ))}
        </HStack>

        <Button size="md" rounded="full" mt={4}>
          <Play fill="currentColor" />
          Play
        </Button>
      </VStack>
    </Stack>
  );
}
