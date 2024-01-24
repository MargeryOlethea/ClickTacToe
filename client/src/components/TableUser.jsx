/* eslint-disable react/prop-types */
import TableUserRows from "./TableUserRows";

function TableUser({ users }) {
  return (
    <>
      <section className="container px-4 mx-auto">
        {users && (
          <div className="flex flex-col mt-6">
            <div className=" -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full align-middle mt-5">
                <div className="overflow-hidden  md:rounded-lg">
                  <div className="flex px-5 py-3 text-sm text-white bg-cover bg-center bg-[url('/gradients/gradient3.png')] rounded-full mb-5 font-bold">
                    <p className="w-2/12">ID</p>
                    <p className="w-4/12"> Username</p>
                    <p className="w-2/12"> Total Wins</p>
                    <p className="w-2/12"> Total Games</p>
                    <p className="w-2/12"> Win Rate</p>
                  </div>
                  {users?.map((user) => {
                    return <TableUserRows key={user.id} user={user} />;
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

export default TableUser;
