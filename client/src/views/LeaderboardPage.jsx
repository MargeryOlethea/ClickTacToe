import { useDispatch, useSelector } from "react-redux";
import TableUser from "../components/TableUser";
import { useEffect } from "react";
import { fetchUsersThunk } from "../features/usersSlice";
import Swal from "sweetalert2";
import Loading from "../components/Loading";

function LeaderboardPage() {
  // FETCH DATA
  const { users, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersThunk());

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
      <section className="bg-gray-100 m-5 rounded-3xl h-full p-10">
        <h2 className="text-4xl font-bold text-gray-800">Leaderboards</h2>

        {users.length > 0 && !error && <TableUser users={users} />}
      </section>
    </>
  );
}

export default LeaderboardPage;
