import AllAlbum from "../../../components/album/components/all-album";
import PopularAlbum from "../../../components/album/components/popular-album";
import { Tabs } from "@chakra-ui/react";
import ArtistDetailsSongs from "./artist-details-popular-songs";

export default function ArtistDetailsOther() {
  return (
    <Tabs.Root
      w="full"
      defaultValue="popularAlbums"
      variant="subtle"
      css={{
        "--tabs-bg": "bg.subtle",
        "--tabs-indicator-bg": "colors.gray.subtle",
        "--tabs-indicator-shadow": "shadows.xs",
        "--tabs-trigger-radius": "radii.full",
      }}
    >
      <Tabs.List gap={2}>
        <Tabs.Trigger
          value="popularAlbums"
          bg="bg.subtle"
          _selected={{ bg: "transparent" }}
        >
          Popular Albums
        </Tabs.Trigger>
        <Tabs.Trigger
          value="allAlbums"
          bg="bg.subtle"
          _selected={{ bg: "transparent" }}
        >
          All Albums
        </Tabs.Trigger>
        <Tabs.Trigger
          value="allSongs"
          bg="bg.subtle"
          _selected={{ bg: "transparent" }}
        >
          All Songs
        </Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="popularAlbums">
        <PopularAlbum />
      </Tabs.Content>

      <Tabs.Content value="allAlbums">
        <AllAlbum />
      </Tabs.Content>

      <Tabs.Content value="allSongs">
        <ArtistDetailsSongs />
      </Tabs.Content>
    </Tabs.Root>
  );
}
