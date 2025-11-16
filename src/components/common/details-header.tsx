import { Avatar, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { Play } from "lucide-react";

export default function DetailsHeader({
  isFavourites = false,
}: {
  isFavourites?: boolean;
}) {
  const metaItems = isFavourites
    ? ["Created by me", "50 tracks", "200 mins", "Created on 2023"]
    : ["Artist Name", "05 tracks", "120 mins", "Released 2023"];

  return (
    <HStack align="center" gap={4}>
      <Avatar.Root
        shape="rounded"
        size="lg"
        boxSize="180px"
        borderRadius="full"
      >
        <Avatar.Fallback name="Random User" />
        <Avatar.Image src="https://picsum.photos/seed/artist1/300/300" />
      </Avatar.Root>

      <VStack w="full" gap={1} align="start" px={2}>
        <Text fontWeight="bold" fontSize="4xl">
          {isFavourites ? "My Favourites" : "Album Name"}
        </Text>

        {/* Better metadata renderer */}
        <HStack wrap="wrap" gap={2} align="center">
          {metaItems.map((item, i) => (
            <HStack key={i} gap={2} align="center">
              <Text fontSize="sm" color="muted">
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
    </HStack>
  );
}
