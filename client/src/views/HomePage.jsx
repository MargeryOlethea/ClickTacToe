import { useEffect, useState } from "react";
import PasswordFormModal from "./modals/PasswordFormModal";
import CreateRoomModal from "./modals/CreateRoomModal";
import TableRoom from "../components/TableRoom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomsThunk } from "../features/roomsSlice";

function HomePage() {
  // FETCH DATA
  const { rooms, loading, error } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomsThunk());
  }, []);

  console.log(rooms);
  // PASSWORD MODAL
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  const openPasswordModal = () => {
    setPasswordModalOpen(true);
  };
  const closePasswordModal = () => setPasswordModalOpen(false);

  // CREATE ROOM MODAL
  const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false);

  const openCreateRoomModal = () => {
    setCreateRoomModalOpen(true);
  };
  const closeCreateRoomModal = () => setCreateRoomModalOpen(false);
  console.log(isCreateRoomModalOpen);

  return (
    <>
      <section className="p-10 mx-16">
        <h2 className="py-7 text-2xl font-medium text-gray-800">Room Lists</h2>
        <button
          type=""
          className="py-2 px-3 text-white bg-orange-600 hover:bg-orange-500 rounded-md shadow font-semibold"
          onClick={openCreateRoomModal}
        >
          Create Room
        </button>
        {/* Ini Atasnya Table End */}

        <TableRoom />

        {/* MODLA MODAL */}

        <button className="m-10 border p-5" onClick={openPasswordModal}>
          {" "}
          buka password
        </button>

        <PasswordFormModal
          isOpen={isPasswordModalOpen}
          onClose={closePasswordModal}
        />

        <CreateRoomModal
          isOpen={isCreateRoomModalOpen}
          onClose={closeCreateRoomModal}
        />
      </section>
    </>
  );
}

export default HomePage;
