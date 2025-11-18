import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Layout from "../components/root-layout.tsx";
import Loader from "../components/common/loader.tsx";

const Home = lazy(() => import("../pages/home/page.tsx"));
const Favourites = lazy(() => import("../pages/favourites/page.tsx"));
const SearchPage = lazy(() => import("../pages/search/page.tsx"));

const AllArtists = lazy(() => import("../pages/artist/page.tsx"));
const ArtistDetail = lazy(() => import("../pages/artist/[id]/page.tsx"));

const AllAlbums = lazy(() => import("../pages/album/page.tsx"));
const AlbumDetail = lazy(() => import("../pages/album/[id]/page.tsx"));

function LoadingFallback() {
  return <Loader />;
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
        path: "album/:name/:album",
        element: <AlbumDetail />,
      },
      {
        path: "favourites",
        element: <Favourites />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
