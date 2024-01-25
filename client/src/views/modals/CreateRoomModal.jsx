import { useState } from "react";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { fetchRoomsThunk } from "../../features/roomsSlice";
import { socket } from "../../socket";

/* eslint-disable react/prop-types */
function CreateRoomModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [createRoomData, setCreateRoomData] = useState({
    name: "",
    status: "",
    password: "",
  });

  // HANDLE SUBMIT
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post(`${url}/rooms`, createRoomData, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      dispatch(fetchRoomsThunk());
      navigate("/");

      onClose();

      Swal.fire({
        title: "Success!",
        icon: "success",
        text: `Success created room ${data.name}!`,
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
    socket.emit("new room");
  }

  // CONDITION BUAT MODAL
  if (!isOpen) return null;

  // CONDITIONAL LOADING
  if (loading) {
    return (
      <div className="h-full w-full flex justify-center align-center">
        <Loading />
      </div>
    );
  }

  // START RETURN
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50"
          onClick={onClose}
        ></div>

        <div
          className={
            "fixed bg-white w-2/6 min-h-4/6 rounded-3xl shadow-lg flex max-md:w-3/6"
          }
        >
          <div className="p-10 w-full h-full">
            <p className="text-2xl font-bold text-gray-800">Create Room</p>
            <form
              onSubmit={handleSubmit}
              className="text-gray-800 mt-8 space-y-5"
            >
              <div>
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  required
                  placeholder="room name"
                  className="border-none py-3 px-5 w-full rounded-2xl bg-gray-100 mt-2"
                  onChange={(e) =>
                    setCreateRoomData({
                      ...createRoomData,
                      ["name"]: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="font-medium">Status</label>
                <select
                  required
                  className="border-none  py-3 px-5 w-full rounded-2xl bg-gray-100 mt-2"
                  onChange={(e) =>
                    setCreateRoomData({
                      ...createRoomData,
                      ["status"]: e.target.value,
                    })
                  }
                >
                  <option hidden>Choose</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
              {createRoomData.status === "Private" && (
                <div>
                  <label className="font-medium">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="room password"
                    className="border-none  py-3 px-5 w-full rounded-2xl bg-gray-100 mt-2"
                    onChange={(e) =>
                      setCreateRoomData({
                        ...createRoomData,
                        ["password"]: e.target.value,
                      })
                    }
                  />
                </div>
              )}
              <div>
                <button className="w-2/6 px-4 py-3 mt-10 text-gray-800 border border-gray-500 font-medium bg-white hover:bg-orange-400 hover:text-white hover:border-transparent rounded-full duration-150 block">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateRoomModal;
