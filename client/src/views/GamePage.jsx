/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Blocks from "../components/Blocks";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import axios from "axios";
import { socket } from "../socket";

function GamePage() {
  // FETCH DATA
  let [game, setGame] = useState({});
  let [loading, setLoading] = useState(false);
  let { id } = useParams();
  let url = import.meta.env.VITE_API_URL;
  let [squares, setSquares] = useState(Array(9).fill(null));

  async function fetchGameData(id) {
    try {
      setLoading(true);

      const { data } = await axios.get(`${url}/rooms/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      setGame(data);
      setSquares(data.history.split(","));
    } catch (error) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: error,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGameData(id);
    socket.on("refresh game", () => {
      fetchGameData(id);
    });
    return () => {
      socket.off("refresh game", () => {
        fetchGameData(id);
      });
    };
  }, []);

  // HANDLE WINNER
  function isWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return false;
  }

  // HANDLE GAME (CLICK)
  // const [winner, setWinner] = useState("");

  async function handleClick(i) {
    // HANDLE PEMBATAS BIAR GABISA CLICK
    if (
      squares[i] ||
      isWinner(squares) ||
      game.turn !== localStorage.username ||
      !game.SecondUserId
    ) {
      return;
    }

    // MASUKIN X ATAU O
    const nextSquares = [...squares];

    nextSquares[i] = game?.turn === game?.FirstUser?.username ? "X" : "O";
    let newHistory = nextSquares.join(",");

    setSquares(nextSquares);

    // HANDLE SIAPA WINNERNYA
    let winner = "";
    const checkWinner = isWinner(nextSquares);

    if (checkWinner && checkWinner === "X") {
      winner = game?.FirstUser?.username;
    }
    if (checkWinner && checkWinner === "O") {
      winner = game?.SecondUser?.username;
    }

    // PUT KE DATABASE
    try {
      const { data } = await axios.put(
        `${url}/rooms/${id}`,
        { history: newHistory, winner },
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } },
      );
      fetchGameData(id);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: error.response.data.message,
      });
    }

    // UPDATE STATUS USER
    // MENANG YANG PERTAMA
    if (winner === game?.FirstUser?.username) {
      try {
        // WIN
        await axios.put(
          `${url}/user/${game?.FirstUserId}`,
          { match: "win" },
          { headers: { Authorization: `Bearer ${localStorage.access_token}` } },
        );
        // LOSE
        await axios.put(
          `${url}/user/${game?.SecondUserId}`,
          { match: "lose" },
          { headers: { Authorization: `Bearer ${localStorage.access_token}` } },
        );
      } catch (error) {
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: error.response.data.message,
        });
      }
    }

    // MENANG YANG KEDUA
    if (winner === game?.SecondUser?.username) {
      try {
        // WIN
        await axios.put(
          `${url}/user/${game?.SecondUserId}`,
          { match: "win" },
          { headers: { Authorization: `Bearer ${localStorage.access_token}` } },
        );
        // LOSE
        await axios.put(
          `${url}/user/${game?.FirstUserId}`,
          { match: "lose" },
          { headers: { Authorization: `Bearer ${localStorage.access_token}` } },
        );
      } catch (error) {
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: error.response.data.message,
        });
      }
    }

    let toggle = false;
    nextSquares.forEach((square) => {
      if (!square) {
        toggle = true;
      }
    });

    // KALAU TIE
    if (!toggle && !winner) {
      try {
        // USER2
        await axios.put(
          `${url}/user/${game?.SecondUserId}`,
          { match: "lose" },
          { headers: { Authorization: `Bearer ${localStorage.access_token}` } },
        );
        // USER1
        await axios.put(
          `${url}/user/${game?.FirstUserId}`,
          { match: "lose" },
          { headers: { Authorization: `Bearer ${localStorage.access_token}` } },
        );

        // UPDATE WINNER JADI TIE

        await axios.put(
          `${url}/rooms/${id}`,
          { history: newHistory, winner: "tie" },
          { headers: { Authorization: `Bearer ${localStorage.access_token}` } },
        );
        fetchGameData(id);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: error.response.data.message,
        });
      }
    }

    socket.emit("next turn");
  }

  if (game.winner) {
    console.log(game.winner, "ini winner");
    // SWAL BUAT PEMENANG
    if (game?.winner === localStorage.username) {
      Swal.fire({
        title: "You win!",
        text: "Congratulations!",
      });
    }
    // SWAL BUAT YG KALAH
    if (
      game.winner === game.SecondUser.username ||
      game.winner === game.FirstUser.username
    ) {
      if (game.winner !== localStorage.username) {
        Swal.fire({
          title: "You lose!",
          text: "Try again next time!",
        });
      }
    }

    // SWAL BUAT YG TIE
    if (game?.winner === "tie") {
      Swal.fire({
        title: "It's tie!",
        text: "Fight again?",
      });
    }
  }

  //HANDLE STATUS
  let status = "";
  if (game?.winner) {
    status = "Winner: " + game?.winner;
  } else if (!game.SecondUserId) {
    status = "Waiting for player2";
  } else {
    status = "Next player: " + game?.turn;
  }

  // CONDITIONAL LOADING
  if (loading || squares.length === 0) {
    return (
      <div className="h-screen w-screen flex justify-center align-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-around p-10">
        <p className=" rounded-full px-7 py-2.5 bg-red-500 text-white text-md">
          Player 1:{" "}
          <span className="font-bold ">{game?.FirstUser?.username}</span>
        </p>
        <p className="rounded-full px-7 py-2.5 bg-yellow-400 text-white text-md">
          Player 2:{" "}
          <span className="font-bold">{game?.SecondUser?.username}</span>{" "}
        </p>
      </div>
      <div className="flex justify-center">
        <Link to="/leaderboards">
          <p className="font-extrabold text-xl my-5 mx-auto block text-gray-800 py-3 px-10 rounded-full border border-gray-500 hover:bg-orange-400 hover:text-white hover:border-transparent">
            {status}
          </p>
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-3 w-[450px] h-[450px] bg-white p-10">
          <Blocks
            value={game?.history?.split(",")[0]}
            onSquareClick={() => handleClick(0)}
          />
          <Blocks
            value={game?.history?.split(",")[1]}
            onSquareClick={() => handleClick(1)}
          />
          <Blocks
            value={game?.history?.split(",")[2]}
            onSquareClick={() => handleClick(2)}
          />
          <Blocks
            value={game?.history?.split(",")[3]}
            onSquareClick={() => handleClick(3)}
          />
          <Blocks
            value={game?.history?.split(",")[4]}
            onSquareClick={() => handleClick(4)}
          />
          <Blocks
            value={game?.history?.split(",")[5]}
            onSquareClick={() => handleClick(5)}
          />
          <Blocks
            value={game?.history?.split(",")[6]}
            onSquareClick={() => handleClick(6)}
          />
          <Blocks
            value={game?.history?.split(",")[7]}
            onSquareClick={() => handleClick(7)}
          />
          <Blocks
            value={game?.history?.split(",")[8]}
            onSquareClick={() => handleClick(8)}
          />
        </div>
      </div>
      {game?.winner && (
        <div className="flex justify-center w-full mb-20">
          <Link to="/" className="w-1/6">
            <button className="w-full px-4 py-3 -mt-5 text-gray-800 border border-gray-500 font-medium bg-white hover:bg-orange-400 hover:text-white hover:border-transparent rounded-full duration-150 block">
              Back to home
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default GamePage;
