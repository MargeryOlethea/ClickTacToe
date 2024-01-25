import { useEffect, useState } from "react";
import CreateRoomModal from "./modals/CreateRoomModal";
import TableRoom from "../components/TableRoom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomsThunk } from "../features/roomsSlice";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import { socket } from "../socket";
import useSound from "use-sound";
import errorSfx from "../sounds/Error.mp3";

function HomePage() {
  // FETCH DATA
  const { rooms, loading, error } = useSelector((state) => state.rooms);
  const [filter, setFilter] = useState(null);
  const dispatch = useDispatch();
  const [playError] = useSound(errorSfx);

  useEffect(() => {
    dispatch(fetchRoomsThunk(filter));
    socket.on("refresh room", () => {
      dispatch(fetchRoomsThunk(filter));
    });

    if (error) {
      playError();
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
  }, [filter]);

  // HANDLE FILTER
  function handleFilter() {
    setFilter("filter");
  }

  function removeFilter() {
    setFilter(null);
  }

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
      <section className="h-full m-5 bg-orange-400 rounded-3xl p-10 bg-cover bg-center bg-[url('/gradients/gradient3.png')] text-white">
        <p className="font-extrabold text-3xl">January Challenge!</p>
        <p className="font-semibold text-lg mt-5">
          Play and Win IDR 99.999.999.999!
        </p>
        <p className="mt-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi illum
          sint ullam perferendis natus reprehenderit ut in dolorum sit.
          Doloremque reprehenderit cum cumque tempora qui laudantium incidunt
          nobis voluptates suscipit!
        </p>
      </section>

      <section className="bg-gray-100 m-5 rounded-3xl h-full p-10">
        <h2 className="text-4xl font-bold text-gray-800">Room Lists</h2>
        <div className="flex justify-between">
          <button
            onClick={openCreateRoomModal}
            className="min-w-[200px] px-4 py-3 mt-7 text-gray-800 border border-gray-500 font-medium bg-transparent hover:bg-orange-400 hover:text-white hover:border-transparent rounded-full duration-150 block"
          >
            Create Room
          </button>
          {!filter && (
            <button
              onClick={handleFilter}
              className="min-w-[200px] px-7 py-3 mt-7 text-gray-800 border border-gray-500 font-medium bg-transparent hover:bg-orange-400 hover:text-white hover:border-transparent rounded-full duration-150 block"
            >
              Find Available Room
            </button>
          )}

          {filter && (
            <button
              onClick={removeFilter}
              className="min-w-[200px] px-7 py-3 mt-7 text-gray-800 border border-gray-500 font-medium bg-transparent hover:bg-orange-400 hover:text-white hover:border-transparent rounded-full duration-150 block"
            >
              See All Rooms
            </button>
          )}
        </div>
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
