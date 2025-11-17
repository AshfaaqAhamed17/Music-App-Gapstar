import type { Artist } from "../../../types/artist-details";
import { formatNumber } from "../../../utils/text-formatter";
import { Avatar, Stack, Text, VStack } from "@chakra-ui/react";

interface ArtistDetailsHeaderProps {
  artistInfo: Artist;
}

export default function ArtistDetailsHeader({
  artistInfo,
}: ArtistDetailsHeaderProps) {
  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      align={{ base: "start", md: "center" }}
      gap={4}
      zIndex={1}
    >
      <Avatar.Root shape="full" size="lg" boxSize="120px" borderRadius="full">
        <Avatar.Fallback name={artistInfo.name} />
        <Avatar.Image
          src={artistInfo.image?.[0]["#text"] as string | undefined}
          alt={artistInfo.name ?? "artist"}
        />
      </Avatar.Root>
      <VStack w="full" gap={1} align="start" px={2}>
        <Text fontWeight="bold" fontSize="4xl" textAlign="start">
          {artistInfo.name}
        </Text>
        <Text fontSize="sm" textAlign="start" color="muted">
          {formatNumber(artistInfo.stats?.playcount)} plays
        </Text>
      </VStack>
    </Stack>
  );
}
