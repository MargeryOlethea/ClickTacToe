/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

export default function RegisterPage({ url }) {
  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      // eslint-disable-next-line no-unused-vars
      const { data } = await axios.post(`${url}/register`, registerData);
      Swal.fire({
        title: "Success",
        text: "Success created new user, please login!",
        icon: "success",
      });
      navigate("/login");
    } catch (error) {
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
    <>
      <main className="h-screen w-screen">
        <div className="flex h-full p-10 gap-5">
          {/* KIRI */}
          <div className="bg-orange-400 w-1/2 bg-cover bg-center bg-[url('/gradients/gradient3.png')] rounded-3xl space-y-2 flex items-center p-10 text-white">
            <div>
              <div className="mt-10">
                <p className="font-extrabold text-3xl ">Comeback King</p>
                <p>
                  Watch X defy the odds and snatch victory from the jaws of
                  defeat in a nail-biting finish!
                </p>
              </div>

              <div className="mt-10">
                <p className="font-extrabold text-3xl ">Mind Games</p>
                <p>
                  Witness a battle of wits as players predict and counter each
                  other, leaving you guessing!
                </p>
              </div>

              <div className="mt-10">
                <p className="font-extrabold text-3xl">Blitz Attack</p>
                <p>
                  Experience the thrill of lightning-fast moves and unstoppable
                  offense in this rapid-fire match!
                </p>
              </div>

              <p className="mt-16 underline font-bold"> Play with us now!</p>
            </div>
          </div>

          {/* KANAN */}
          <div className="w-1/2 flex justify-center items-center">
            <div className="max-w-sm w-full text-gray-600">
              <div className="text-center">
                <div className="text-5xl mb-10">
                  <Logo />
                </div>
                <div className="mt-5 space-y-2">
                  <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                    Sign up
                  </h3>
                  <p className="">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-orange-600 hover:text-orange-500"
                    >
                      Log in
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
                    className=" border-none py-3 px-5 w-full rounded-2xl bg-gray-100 mt-2"
                    onChange={(e) => {
                      setRegisterData({
                        ...registerData,
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
                    className="border-none py-3 px-5 w-full rounded-2xl bg-gray-100 mt-2"
                    onChange={(e) => {
                      setRegisterData({
                        ...registerData,
                        ["password"]: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <button className="w-full px-4 py-3 mt-10 text-gray-800 border border-gray-500 font-medium bg-white hover:bg-orange-500 hover:text-white hover:border-transparent rounded-full duration-150 block">
                    Create account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* BATASSS */}
      <main className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full text-gray-600">
          <div className="text-center">
            <div className="text-5xl mb-10">
              <Logo />
            </div>
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Sign up
              </h3>
              <p className="">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-orange-600 hover:text-orange-500"
                >
                  Log in
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
                  setRegisterData({
                    ...registerData,
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
                className="py-3 px-5 w-full rounded-2xl shadow-inner bg-gray-100 mt-2"
                onChange={(e) => {
                  setRegisterData({
                    ...registerData,
                    ["password"]: e.target.value,
                  });
                }}
              />
            </div>
            <button className="w-full px-4 py-3 mt-10 text-gray-800 border border-gray-500 font-medium bg-white hover:bg-orange-400 hover:text-white hover:border-transparent rounded-full duration-150 block">
              Create Account
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
