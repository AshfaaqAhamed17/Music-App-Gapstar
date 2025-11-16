import { Avatar, VStack, Text } from "@chakra-ui/react";

export interface AlbumTileProps {
  imageUrl: string;
  albumName: string;
  artistName: string;
}

export default function AlbumTile({
  imageUrl,
  albumName,
  artistName,
}: AlbumTileProps) {
  return (
    <VStack align="center" gap={4}>
      <Avatar.Root
        shape="rounded"
        boxSize="full"
        borderRadius="lg"
        objectFit="cover"
        h="225px"
      >
        <Avatar.Fallback name="Random User" />
        <Avatar.Image src={imageUrl} />
      </Avatar.Root>
      <VStack w="full" gap={1} align="start" px={2}>
        <Text fontSize="md" textAlign="start">
          {albumName}
        </Text>
        <Text fontSize="sm" textAlign="start" color="muted">
          {artistName}
        </Text>
      </VStack>
    </VStack>
  );
}
