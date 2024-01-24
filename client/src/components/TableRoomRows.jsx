/* eslint-disable no-unused-vars */
import { useState } from "react";
import PasswordFormModal from "../views/modals/PasswordFormModal";
import Swal from "sweetalert2";
import Loading from "./Loading";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { fetchMyGameThunk } from "../features/myGameSlice";
import { fetchRoomsThunk } from "../features/roomsSlice";
import { socket } from "../socket";

/* eslint-disable react/prop-types */
function TableRoomRows({ room }) {
  // BIKIN STATUS
  let status = "";

  if (room.winner === "tie") {
    status = "Tie!";
  } else if (room.winner) {
    status = `Winner: ${room.winner}`;
  } else if (!room.SecondUserId) {
    status = "Waiting for Player2";
  } else {
    status = `Turn: ${room.turn}`;
  }
  // PASSWORD MODAL
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  const openPasswordModal = () => {
    setPasswordModalOpen(true);
  };
  const closePasswordModal = () => setPasswordModalOpen(false);

  // HANDLE JOIN
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_API_URL;

  async function handleJoin(id, status) {
    if (status === "Private") {
      openPasswordModal();
    } else {
      try {
        setLoading(true);

        const { data } = await axios.patch(
          `${url}/rooms/${id}/join`,
          {},
          { headers: { Authorization: `Bearer ${localStorage.access_token}` } },
        );

        dispatch(fetchMyGameThunk(), fetchRoomsThunk());
        navigate(`/game/${id}`);
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
    socket.emit("new user");
  }

  // HANDLE JOIN PRIVATE
  async function handleJoinPrivate(e, pass, id) {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.patch(
        `${url}/rooms/${id}/join`,
        { password: pass },
        {
          headers: { Authorization: `Bearer ${localStorage.access_token}` },
        },
      );

      dispatch(fetchMyGameThunk(), fetchRoomsThunk());
      navigate(`/game/${id}`);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
    socket.emit("new user");
  }

  // CONDITIONAL LOADING
  if (loading) {
    return (
      <div className="h-full w-full flex justify-center align-center">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <div className="flex px-5 py-2.5 my-2 text-md text-gray-800 font-semibold rounded-xl bg-white border items-center">
        <p className="w-1/6 font-bold">{room.name}</p>
        <div className="w-2/12">
          <p
            className={`w-1/2 text-center text-xs py-1 px-2 rounded-full text-white ${
              room.status === "Public" ? "bg-yellow-500 " : " bg-red-500"
            }`}
          >
            {room.status}
          </p>
        </div>
        <p
          className={`w-3/12 text-sm text-gray-800 ${
            status === "Waiting for Player2" && "animate-pulse text-orange-500"
          }`}
        >
          {" "}
          {status}
        </p>
        <p className="w-2/12 text-red-700 font-medium">
          {" "}
          {room?.FirstUser?.username}
        </p>
        <p className="w-2/12 text-orange-400 font-medium">
          {" "}
          {room?.SecondUser?.username || "-"}
        </p>
        {!room.winner && (
          <div className="w-1/12">
            <button
              className=" px-4 py-2 text-white text-sm bg-orange-600 hover:bg-orange-500 active:bg-orange-600 rounded-lg duration-150"
              onClick={() => {
                handleJoin(room.id, room.status);
              }}
            >
              Join
            </button>
          </div>
        )}
      </div>

      {/* MODAL FORM */}
      <PasswordFormModal
        id={room.id}
        isOpen={isPasswordModalOpen}
        onClose={closePasswordModal}
        onSubmit={(e, data, id) => handleJoinPrivate(e, data, id)}
      />
    </>
  );
}

export default TableRoomRows;
