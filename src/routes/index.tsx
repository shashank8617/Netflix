import { Navigate, createBrowserRouter } from "react-router-dom";
import { MAIN_PATH } from "src/constant";

import MainLayout from "src/layouts/MainLayout";
// import {loader as mainLoader} from 'src/pages/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: MAIN_PATH.root,
        element: <Navigate to={`/${MAIN_PATH.browse}`} />,
      },
      {
        path: MAIN_PATH.browse,
        lazy: () => import("src/pages/HomePage"),
      },
      {
        path: MAIN_PATH.genreExplore,
        children: [
          {
            path: ":genreId",
            lazy: () => import("src/pages/GenreExplore"),
            loader: async () => {
              const { loader: mainLoader } = await import("src/pages/HomePage");
              return mainLoader();
            },
          },
        ],
      },
      {
        path: MAIN_PATH.watch,
        lazy: () => import("src/pages/WatchPage"),
      },
    ],
  },
]);

export default router;
