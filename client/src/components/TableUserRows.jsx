function TableUserRows() {
  return (
    <>
      <div className="flex px-5 py-2.5 my-2 text-md text-gray-800 font-semibold rounded-xl bg-white border items-center">
        <p className="w-2/12">1</p>
        <div className="w-4/12">
          <p className="w-1/3 text-center text-sm py-1 px-2 rounded-full bg-orange-600 text-white">
            {" "}
            Aldi Taher
          </p>
        </div>
        <p className="w-2/12"> 10</p>
        <p className="w-2/12"> 3</p>
        <p className="w-2/12 text-red-800"> 30%</p>
      </div>
    </>
  );
}

export default TableUserRows;
