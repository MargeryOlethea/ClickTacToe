import { useDispatch, useSelector } from "react-redux";
import TableRoom from "../components/TableRoom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { fetchMyGameThunk } from "../features/myGameSlice";
import Loading from "../components/Loading";
import useSound from "use-sound";
import errorSfx from "../sounds/Error.mp3";

function MyGamePage() {
  const [playError] = useSound(errorSfx);
  // FETCH DATA
  const { myGame, loading, error } = useSelector((state) => state.myGame);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyGameThunk());

    if (error) {
      playError();
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: error,
      });
    }
  }, []);

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
      <section className="bg-gray-100 m-5 rounded-3xl h-full p-10">
        <h2 className="text-4xl font-bold text-gray-800">My Game</h2>

        <button className="w-[200px] px-4 py-3 mt-7 text-gray-800 border border-gray-500 font-medium bg-transparent hover:bg-orange-400 hover:text-white hover:border-transparent rounded-full duration-150 block">
          Create Room
        </button>
        {myGame.length > 0 && !error && <TableRoom rooms={myGame} />}
      </section>
    </>
  );
}

export default MyGamePage;
