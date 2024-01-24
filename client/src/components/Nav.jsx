/* eslint-disable no-unused-vars */
import { useState } from "react";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
useNavigate;
export default function Nav() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <nav className="bg-white w-full border-b md:border-0 md:static rounded-lg shadow-md">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <div className="text-2xl">
            <Link to="/">
              <Logo />
            </Link>
          </div>
        </div>

        <div className="flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0">
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <li className="text-gray-600 hover:text-orange-600">
              <Link to="/my-game">My Games</Link>
            </li>
            <li className="text-gray-600 hover:text-orange-600">
              <Link to="/leaderboards">Leaderboards</Link>
            </li>
          </ul>
        </div>
        <div className="mx-20 font-extrabold hover:text-orange-600 transition ease-in-out duration:500">
          Hello {localStorage.username}!
        </div>
        <div className="">
          <button
            onClick={handleLogout}
            className="py-3 px-4 text-white bg-orange-600 hover:bg-orange-500 rounded-md shadow font-bold"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
