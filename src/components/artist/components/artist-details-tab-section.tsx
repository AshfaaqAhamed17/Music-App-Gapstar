import AlbumListingComponent from "../../common/album-listing";
import { Tabs } from "@chakra-ui/react";
import Loader from "../../../components/common/loader";
import { useArtistStore } from "../../../store/artist-store";
import SongsListingComponent from "../../common/songs-listing";

export default function ArtistDetailsTabSection() {
  const artistTopAlbums = useArtistStore((s) => s.artistTopAlbums);
  const isArtistLoading = useArtistStore((s) => s.isArtistLoading);
  const artistTopTracks = useArtistStore((s) => s.artistTopTracks);

  if (isArtistLoading) {
    return <Loader />;
  }

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
          Popular albums
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
          All albums
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
          All songs
        </Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="popularAlbums">
        {/* <AlbumListingComponent albums={} /> */}
        <AlbumListingComponent albums={artistTopAlbums.slice(0, 5)} />
      </Tabs.Content>

      <Tabs.Content value="allAlbums">
        <AlbumListingComponent albums={artistTopAlbums.reverse()} />
      </Tabs.Content>

      <Tabs.Content value="allSongs">
        <SongsListingComponent tracks={artistTopTracks} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
