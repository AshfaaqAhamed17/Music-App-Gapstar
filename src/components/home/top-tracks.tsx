import { VStack, Text, useBreakpointValue } from "@chakra-ui/react";
import { useTracksStore } from "@/store/tracks-store";
import { useEffect, useMemo } from "react";
import { BarList, type BarListData, useChart } from "@chakra-ui/charts";

export interface Track {
  id: string;
  title: string;
  artist: string;
  plays: number;
}

export default function TracksChart() {
  const { tracks, isLoading, fetchTopTracks } = useTracksStore();
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    fetchTopTracks();
  }, [fetchTopTracks]);

  const parsedTracks = useMemo(() => {
    if (!tracks.length) return [];

    return tracks
      .slice(0, 6)
      .map((t) => ({
        name:
          isMobile && t.name.length > 20 ? t.name.slice(0, 17) + "..." : t.name,
        value: Number(t.playcount),
      }))
      .sort((a, b) => b.value - a.value);
  }, [tracks, isMobile]);

  const chart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: parsedTracks,
    series: [{ name: "name", color: "chart1" }],
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (!tracks.length) return <Text>Failed to load tracks</Text>;

  return (
    <VStack
      gap={3}
      align="stretch"
      bg="bg.subtle"
      p={8}
      borderRadius="2xl"
      w="full"
    >
      <BarList.Root chart={chart}>
        <BarList.Content>
          <BarList.Bar />
          <BarList.Value />
        </BarList.Content>
      </BarList.Root>
    </VStack>
  );
}
