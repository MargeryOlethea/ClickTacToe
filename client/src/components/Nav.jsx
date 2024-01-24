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
      <nav className="bg-gray-100 m-5 rounded-3xl">
        <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <div className="text-2xl">
              <Link to="/">
                <Logo />
              </Link>
            </div>
          </div>

          <div className="flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0">
            <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0 p-5 font-bold">
              <li className="text-gray-600 hover:text-orange-400">
                <Link to="/leaderboards">Leaderboards</Link>
              </li>
            </ul>
          </div>

          <div>
            <ButtonDropdown onClick={handleLogout} />
          </div>
        </div>
      </nav>
    </>
  );
}
