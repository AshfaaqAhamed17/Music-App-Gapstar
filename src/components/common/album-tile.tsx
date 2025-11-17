import type { AlbumImage } from "@/types/album";
import { Avatar, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export interface AlbumTileProps {
  imageUrl: AlbumImage[];
  albumName: string;
  artistName: string;
}

export default function AlbumTile({
  imageUrl,
  albumName,
  artistName,
}: AlbumTileProps) {
  const navigate = useNavigate();

  const selectCover = (imageArr?: AlbumImage[]) => {
    if (!imageArr?.length) return undefined;
    const pref = ["extralarge", "large", "medium", "small"];
    for (const size of pref) {
      const item = imageArr.find((i) => i.size === size && i["#text"]);
      if (item && item["#text"]) return item["#text"];
    }
    return imageArr.find((i) => i["#text"])?.["#text"];
  };

  return (
    <VStack
      align="center"
      gap={4}
      cursor="pointer"
      onClick={() => {
        navigate(
          `/album/${encodeURIComponent(artistName)}/${encodeURIComponent(
            albumName
          )}`
        );
      }}
    >
      <Avatar.Root
        shape="rounded"
        boxSize="full"
        borderRadius="lg"
        objectFit="cover"
        h="240px"
      >
        <Avatar.Fallback name="Random User" />
        <Avatar.Image src={selectCover(imageUrl)} />
      </Avatar.Root>
      <VStack w="full" gap={1} align="start" px={2}>
        <Text fontSize="md" textAlign="start">
          {albumName}
        </Text>
        <Text
          fontSize="sm"
          textAlign="start"
          color="muted"
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/artist/${encodeURIComponent(artistName)}`);
          }}
        >
          {artistName}
        </Text>
      </VStack>
    </VStack>
  );
}
