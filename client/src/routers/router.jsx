import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Testing from "../views/testing/Testing";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: "",
  },
  {
    path: "/login",
    element: "",
  },
  {
    element: <BaseLayout />,
    children: [
      { path: "/", element: <Testing /> },
      { path: "/game", element: "" },
      { path: "/my-game", element: "" },
      { path: "/leaderboards", element: "" },
    ],
  },
]);
