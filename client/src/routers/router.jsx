import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import GamePage from "../views/GamePage";
import HomePage from "../views/HomePage";
import MyGamePage from "../views/MyGamePage";
import LeaderboardPage from "../views/LeaderboardPage";

const url = import.meta.env.VITE_API_URL;

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterPage url={url} />,
  },
  {
    path: "/login",
    loader: () => {
      let token = localStorage.access_token;

      if (token) {
        return redirect("/");
      }

      return null;
    },
    element: <LoginPage url={url} />,
  },
  {
    element: <BaseLayout />,
    loader: () => {
      let token = localStorage.access_token;

      if (!token) {
        return redirect("/login");
      }

      return null;
    },
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/game/:id", element: <GamePage /> },
      { path: "/my-game", element: <MyGamePage /> },
      { path: "/leaderboards", element: <LeaderboardPage /> },
    ],
  },
]);
