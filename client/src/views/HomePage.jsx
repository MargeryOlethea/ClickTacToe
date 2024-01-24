import { useEffect, useState } from "react";
import PasswordFormModal from "./modals/PasswordFormModal";
import CreateRoomModal from "./modals/CreateRoomModal";
import TableRoom from "../components/TableRoom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomsThunk } from "../features/roomsSlice";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import { socket } from "../socket";

function HomePage() {
  // FETCH DATA
  const { rooms, loading, error } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomsThunk());
    socket.on("refresh room", () => {
      dispatch(fetchRoomsThunk());
    });

    if (error) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: error,
      });
    }

    return () =>
      socket.off("refresh room", () => {
        dispatch(fetchRoomsThunk());
      });
  }, []);

  // CREATE ROOM MODAL
  const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false);

  const openCreateRoomModal = () => {
    setCreateRoomModalOpen(true);
  };
  const closeCreateRoomModal = () => setCreateRoomModalOpen(false);

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
      {/* SECTION ATAS START */}
      <section className="h-full m-5 bg-blue-200 rounded-3xl p-10 bg-cover bg-center bg-[url('/gradients/gradient3.png')] text-white">
        <p className="font-extrabold text-3xl">January Challenge!</p>
        <p className="font-semibold text-lg mt-5">
          Play and Win IDR 5.000.000!
        </p>
        <p className="mt-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi illum
          sint ullam perferendis natus reprehenderit ut in dolorum sit.
          Doloremque reprehenderit cum cumque tempora qui laudantium incidunt
          nobis voluptates suscipit!
        </p>
      </section>

      <section className="bg-gray-100 m-5 rounded-3xl h-full p-10">
        lalala
      </section>

      {/* SECTION BAWAH START */}
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
