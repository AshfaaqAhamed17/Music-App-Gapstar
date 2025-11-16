import { Avatar, VStack, Text } from "@chakra-ui/react";

export interface ArtistTileProps {
  imageUrl: string;
  artistName: string;
}

export default function ArtistTile({ imageUrl, artistName }: ArtistTileProps) {
  return (
    <VStack align="center" gap={6}>
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
