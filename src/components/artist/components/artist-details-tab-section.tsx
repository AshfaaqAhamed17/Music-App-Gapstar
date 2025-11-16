import AlbumListingComponent from "../../common/album-listing";
import { Tabs } from "@chakra-ui/react";
import SongsListingComponent from "../../common/songs-listing";

export default function ArtistDetailsTabSection() {
  return (
    <Tabs.Root
      w="full"
      defaultValue="popularAlbums"
      variant="subtle"
      css={{
        "--tabs-bg": "bg.subtle",
        "--tabs-indicator-bg": "colors.text",
        "--tabs-indicator-shadow": "shadows.xs",
        "--tabs-trigger-radius": "radii.full",
      }}
    >
      <Tabs.List gap={2} mb={3}>
        <Tabs.Trigger
          value="popularAlbums"
          bg="bg.subtle"
          _selected={{
            bg: "transparent",
            color: "text.overlay",
            fontWeight: "bold",
          }}
        >
          Popular Albums
        </Tabs.Trigger>
        <Tabs.Trigger
          value="allAlbums"
          bg="bg.subtle"
          _selected={{
            bg: "transparent",
            color: "text.overlay",
            fontWeight: "bold",
          }}
        >
          All Albums
        </Tabs.Trigger>
        <Tabs.Trigger
          value="allSongs"
          bg="bg.subtle"
          _selected={{
            bg: "transparent",
            color: "text.overlay",
            fontWeight: "bold",
          }}
        >
          All Songs
        </Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="popularAlbums">
        <AlbumListingComponent count={5} />
      </Tabs.Content>

      <Tabs.Content value="allAlbums">
        <AlbumListingComponent count={35} />
      </Tabs.Content>

      <Tabs.Content value="allSongs">
        <SongsListingComponent count={10} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
