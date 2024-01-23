import TableRoom from "../components/TableRoom";

function MyGamePage() {
  return (
    <>
      <section className="p-10 mx-16">
        <h2 className="py-7 text-2xl font-medium text-gray-800">My Games</h2>

        <TableRoom />
      </section>
    </>
  );
}

export default MyGamePage;
