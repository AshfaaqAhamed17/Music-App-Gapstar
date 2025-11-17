import DetailsHeader from "@/components/common/details-header";
import { useAlbumStore } from "@/store/album-store";
import SongsListingComponent from "@/components/common/songs-listing";
import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../components/common/loader";

export default function AlbumDetail() {
  const { name, album } = useParams<{ name: string; album: string }>();
  const fetchAlbumDetails = useAlbumStore((s) => s.fetchAlbumDetails);
  const selectedAlbum = useAlbumStore((s) => s.selectedAlbum);
  const isLoading = useAlbumStore((s) => s.isLoading);

  useEffect(() => {
    if (name && album) {
      fetchAlbumDetails(name, album);
    }
  }, [fetchAlbumDetails, name, album]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <VStack gap={12} align="start">
      <DetailsHeader selectedAlbum={selectedAlbum} />
      <SongsListingComponent tracks={selectedAlbum?.tracks?.track || []} />
    </VStack>
  );
}
