import type { ArtistImage } from "@/types/artist";
import { Avatar, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export interface ArtistTileProps {
  imageUrl: ArtistImage[];
  artistName: string;
}

export default function ArtistTile({ imageUrl, artistName }: ArtistTileProps) {
  const navigate = useNavigate();

  return (
    <VStack
      align="center"
      cursor="pointer"
      gap={6}
      onClick={() => {
        navigate(`/artist/${encodeURIComponent(artistName)}`);
      }}
    >
      <Avatar.Root shape="full" size="lg" boxSize="120px" borderRadius="full">
        <Avatar.Fallback name={artistName} />
        <Avatar.Image
          src={imageUrl.find((img) => img.size === "medium")?.["#text"]}
        />
      </Avatar.Root>
      <Text fontSize="sm" textAlign="center">
        {artistName}
      </Text>
    </VStack>
  );
}
