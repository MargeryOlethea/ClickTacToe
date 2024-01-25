/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useState } from "react";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import useSound from "use-sound";
import errorSfx from "../sounds/Error.mp3";

export default function LoginPage({ url }) {
  const [playError] = useSound(errorSfx);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      let { data } = await axios.post(`${url}/login`, loginData);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("username", data.username);

      navigate("/");
    } catch (error) {
      playError();
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  }
  // CONDITIONAL LOADING
  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center align-center">
        <Loading />
      </div>
    );
  }
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center">
          {/* <img src="./image/klipartz.com.png" width={150} className="mx-auto" /> */}
          <div className="text-5xl mb-10">
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
              className="border-none py-3 px-5 w-full rounded-2xl bg-gray-100 mt-2"
              onChange={(e) => {
                setLoginData({
                  ...loginData,
                  ["username"]: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              placeholder="your password"
              className="border-none  py-3 px-5 w-full rounded-2xl bg-gray-100 mt-2"
              onChange={(e) => {
                setLoginData({
                  ...loginData,
                  ["password"]: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <button className="w-full px-4 py-3 mt-10 text-gray-800 border border-gray-500 font-medium bg-white hover:bg-orange-400 hover:text-white hover:border-transparent rounded-full duration-150 block">
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
