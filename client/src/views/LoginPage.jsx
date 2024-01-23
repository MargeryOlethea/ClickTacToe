/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { useState } from "react";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(loginData);
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          {/* <img src="./image/klipartz.com.png" width={150} className="mx-auto" /> */}
          <div className="text-4xl mb-10">
            <Logo />
          </div>

          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Login
            </h3>
            <p className="">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                className="font-medium text-orange-600 hover:text-orange-500"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="font-medium">Username</label>
            <input
              type="text"
              required
              placeholder="your username"
              className="py-3 px-5 w-full rounded-2xl shadow-inner bg-gray-100 mt-2"
              onChange={(e) => {
                setLoginData({ ...loginData, ["username"]: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              placeholder="your password"
              required
              className="py-3 px-5 w-full rounded-2xl shadow-inner bg-gray-100 mt-2"
              onChange={(e) => {
                setLoginData({ ...loginData, ["password"]: e.target.value });
              }}
            />
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-orange-600 hover:bg-orange-500 active:bg-orange-600 rounded-lg duration-150">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
