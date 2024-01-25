/* eslint-disable no-unused-vars */
import { useState } from "react";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import ButtonDropdown from "./ButtonDropdown";
useNavigate;
export default function Nav() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <nav className="bg-gray-100 m-5 rounded-3xl max-h-[70px]">
        <div className="items-center px-4 mx-auto flex justify-between md:px-8">
          <div className="text-2xl">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0 p-5 font-bold">
            <li className="text-gray-600 hover:text-orange-400">
              <Link to="/leaderboards">Leaderboards</Link>
            </li>
          </ul>

          <div className="py-3">
            <ButtonDropdown onClick={handleLogout} />
          </div>
        </div>
      </nav>
    </>
  );
}
