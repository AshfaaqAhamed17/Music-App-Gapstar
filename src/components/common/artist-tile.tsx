import { Avatar, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export interface ArtistTileProps {
  imageUrl: string;
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
        <Avatar.Fallback name="Random User" />
        <Avatar.Image src={imageUrl} />
      </Avatar.Root>
      <Text fontSize="sm" textAlign="center">
        {artistName}
      </Text>
    </VStack>
  );
}
