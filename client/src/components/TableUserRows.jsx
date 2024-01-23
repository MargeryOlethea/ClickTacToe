/* eslint-disable react/prop-types */
function TableUserRows({ user }) {
  let winRate = Math.round((user.totalWin / user.totalPlay) * 100) || 0;
  console.log(winRate, ">>>>", user.id);

  //conditional color
  let colorBG = "bg-gray-600";
  let colorText = "text-gray-800";

  if (winRate > 90) {
    colorBG = "bg-blue-500";
    colorText = "text-blue-700";
  } else if (winRate > 60) {
    colorBG = "bg-green-500";
    colorText = "text-green-700";
  } else if (winRate > 40) {
    colorBG = "bg-yellow-500";
    colorText = "text-yellow-700";
  } else if (winRate > 0) {
    colorBG = "bg-red-500";
    colorText = "text-red-700";
  }

  return (
    <>
      <div className="flex px-5 py-2.5 my-2 text-md text-gray-800 font-semibold rounded-xl bg-white border items-center">
        <p className="w-2/12">{user.id}</p>
        <div className="w-4/12">
          <p
            className={`w-1/3 text-center text-sm py-1 px-2 rounded-full text-white ${colorBG}`}
          >
            {user.username}
          </p>
        </div>
        <p className="w-2/12">{user.totalPlay}</p>
        <p className="w-2/12">{user.totalWin}</p>
        <p className={`w-2/12 ${colorText}`}>{winRate}%</p>
      </div>
    </>
  );
}

export default TableUserRows;
