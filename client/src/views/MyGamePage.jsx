import { useDispatch, useSelector } from "react-redux";
import TableRoom from "../components/TableRoom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { fetchMyGameThunk } from "../features/myGameSlice";
import Loading from "../components/Loading";

function MyGamePage() {
  // FETCH DATA
  const { myGame, loading, error } = useSelector((state) => state.myGame);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyGameThunk());

    if (error) {
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
      <section className="p-10 mx-16">
        <h2 className="py-7 text-2xl font-bold text-gray-800">My Games</h2>

        <TableRoom rooms={myGame} />
      </section>
    </>
  );
}

export default MyGamePage;
