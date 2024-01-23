import Blocks from "./testing/Blocks";

function GamePage() {
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
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-3 w-[450px] h-[450px] bg-white p-10">
          <Blocks value="X" />
          <Blocks />
          <Blocks value="O" />
          <Blocks />
          <Blocks value="O" />
          <Blocks value="X" />
          <Blocks value="O" />
          <Blocks />
          <Blocks value="X" />
        </div>
      </div>
    </>
  );
}

export default GamePage;
