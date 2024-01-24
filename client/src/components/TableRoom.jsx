/* eslint-disable react/prop-types */
import TableRoomRows from "./TableRoomRows";

export default function TableRoom({ rooms }) {
  return (
    <>
      <section className="container mx-auto">
        {rooms.length > 0 && (
          <div className="flex flex-col mt-6">
            <div className=" -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full align-middle mt-5">
                <div className="overflow-hidden  md:rounded-lg">
                  <div className="flex px-5 py-3 text-sm text-white bg-cover bg-center bg-[url('/gradients/gradient3.png')] rounded-full mb-5 font-bold">
                    <p className="w-2/12">Room Name</p>
                    <p className="w-2/12"> Mode</p>
                    <p className="w-3/12"> Status</p>
                    <p className="w-2/12"> Player 1</p>
                    <p className="w-2/12"> Player 2</p>
                    <p className="w-1/12"></p>
                  </div>
                  {rooms?.map((room) => {
                    return <TableRoomRows key={room.id} room={room} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
