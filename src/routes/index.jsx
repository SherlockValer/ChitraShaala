import { createBrowserRouter } from "react-router-dom";

import App from "../App.jsx";
import Albums from "../pages/Albums.jsx";
import Favorites from "../pages/Favorites.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import Login from "../pages/Login.jsx";
import CreateAlbum from "../pages/CreateAlbum.jsx";
import Images from "../pages/Images.jsx";
import ProtectedRoute from "../components/common/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      // { index: true, element: <Home /> },
      { index: true, element: <Albums /> },
      { path: "create-album", element: <CreateAlbum /> },
      { path: ":albumId", element: <Images /> },
      {
        path: "favorites",
        element: <Favorites />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
