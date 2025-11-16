import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Spinner, Center } from "@chakra-ui/react";
import Layout from "../components/root-layout.tsx";

// Lazy load pages
const Home = lazy(() => import("../pages/home.tsx"));

const AllArtists = lazy(() => import("../pages/artist/page.tsx"));
const ArtistDetail = lazy(() => import("../pages/artist/[id]/page.tsx"));

const AllAlbums = lazy(() => import("../pages/album/page.tsx"));
const AlbumDetail = lazy(() => import("../pages/album/[id]/page.tsx"));

const Favourites = lazy(() => import("../pages/favourites/page.tsx"));

function LoadingFallback() {
  return (
    <Center h="50vh">
      <Spinner size="xl" color="brand.500" />
    </Center>
  );
}

function Root() {
  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "artist",
        element: <AllArtists />,
      },
      {
        path: "artist/:name",
        element: <ArtistDetail />,
      },
      {
        path: "album",
        element: <AllAlbums />,
      },
      {
        path: "album/:name",
        element: <AlbumDetail />,
      },
      {
        path: "favourites",
        element: <Favourites />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
