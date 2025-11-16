import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";

export interface ArtistDetailsHeaderProps {
  imageUrl: string;
  albumName: string;
  artistName: string;
}

export default function ArtistDetailsHeader() {
  return (
    <HStack align="center" gap={4}>
      <Avatar.Root shape="full" size="lg" boxSize="120px" borderRadius="full">
        <Avatar.Fallback name="Random User" />
        <Avatar.Image src="https://picsum.photos/seed/artist1/300/300" />
      </Avatar.Root>
      <VStack w="full" gap={1} align="start" px={2}>
        <Text fontWeight="bold" fontSize="4xl" textAlign="start">
          Artist Name
        </Text>
        <Text fontSize="sm" textAlign="start" color="muted">
          2600 Plays
        </Text>
      </VStack>
    </HStack>
  );
}
