import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Testing from "../views/testing/Testing";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
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
