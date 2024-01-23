function TableRoomRows({ room }) {
  return (
    <>
      <div className="flex px-5 py-2.5 my-2 text-md text-gray-800 font-semibold rounded-xl bg-white border items-center">
        <p className="w-1/6 font-bold">{room.name}</p>
        <div className="w-2/12">
          <p
            className={`w-1/2 text-center text-xs py-1 px-2 rounded-full text-white ${
              room.status === "Public" ? "bg-yellow-500 " : " bg-red-500"
            }`}
          >
            {room.status}
          </p>
        </div>
        <p className="w-3/12 text-sm text-gray-800"> Winner: AldiTaher</p>
        <p className="w-2/12 text-red-700 font-medium"> {room.FirstUserId}</p>
        <p className="w-2/12 text-orange-400 font-medium">
          {" "}
          {room.SecondUserId || "-"}
        </p>
        {!room.winner && (
          <div className="w-1/12">
            <button className=" px-4 py-2 text-white text-sm bg-orange-600 hover:bg-orange-500 active:bg-orange-600 rounded-lg duration-150">
              Join
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default TableRoomRows;
