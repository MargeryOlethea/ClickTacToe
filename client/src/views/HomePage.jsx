import { useEffect, useState } from "react";
import PasswordFormModal from "./modals/PasswordFormModal";
import CreateRoomModal from "./modals/CreateRoomModal";
import TableRoom from "../components/TableRoom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomsThunk } from "../features/roomsSlice";
import Loading from "../components/Loading";
import Swal from "sweetalert2";

function HomePage() {
  // FETCH DATA
  const { rooms, loading, error } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomsThunk());

    if (error) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: error,
      });
    }
  }, []);

  // CREATE ROOM MODAL
  const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false);

  const openCreateRoomModal = () => {
    setCreateRoomModalOpen(true);
  };
  const closeCreateRoomModal = () => setCreateRoomModalOpen(false);
  console.log(isCreateRoomModalOpen);

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
      <section className="p-10 mx-16">
        <h2 className="py-7 text-2xl font-bold text-gray-800">Room Lists</h2>
        <button
          type=""
          className="py-2 px-3 text-white bg-orange-600 hover:bg-orange-500 rounded-md shadow font-semibold"
          onClick={openCreateRoomModal}
        >
          Create Room
        </button>
        {rooms.length > 0 && !error && <TableRoom rooms={rooms} />}

        {/* MODLA MODAL */}
        <CreateRoomModal
          isOpen={isCreateRoomModalOpen}
          onClose={closeCreateRoomModal}
        />
      </section>
    </>
  );
}

export default HomePage;
