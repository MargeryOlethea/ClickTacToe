import { useState } from "react";
import Blocks from "../components/Blocks";
import { Link } from "react-router-dom";

function GamePage() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (squares[i] || isWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();

    nextSquares[i] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

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

  console.log(squares);

  const winner = isWinner(squares);

  let status = "";
  if (winner === "X") {
    status = "Winner: " + "DewiPersik";
  } else if (winner === "O") {
    status = "Winner: " + "AldiTaher";
  } else {
    status = "Next player: " + (xIsNext ? "DewiPersik" : "AldiTaher");
  }

  return (
    <>
      <div className="flex justify-around p-10">
        <p className="text-gray-500">
          Player 1:{" "}
          <span className="font-bold text-red-500 text-lg">DewiPersik</span>
        </p>
        <p className="text-gray-500">
          Player 2:{" "}
          <span className="font-bold text-yellow-500 text-lg">AldiTaher</span>{" "}
        </p>
      </div>
      <div className="flex justify-center">
        <p className="font-extrabold text-xl my-5 mx-auto block">{status}</p>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-3 w-[450px] h-[450px] bg-white p-10">
          <Blocks value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Blocks value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Blocks value={squares[2]} onSquareClick={() => handleClick(2)} />
          <Blocks value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Blocks value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Blocks value={squares[5]} onSquareClick={() => handleClick(5)} />
          <Blocks value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Blocks value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Blocks value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      {winner && (
        <div className="flex justify-center w-full">
          <Link to="/" className="w-1/6">
            <button className="w-full px-4 py-2 text-white font-medium bg-orange-600 hover:bg-orange-500 active:bg-orange-600 rounded-lg duration-150">
              Back to home
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default GamePage;
