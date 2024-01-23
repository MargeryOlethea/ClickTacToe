import TableUser from "../components/TableUser";

function LeaderboardPage() {
  return (
    <>
      <section className="p-10 mx-16">
        <h2 className="py-7 text-2xl font-medium text-gray-800">
          Leaderboards
        </h2>

        <TableUser />
      </section>
    </>
  );
}

export default LeaderboardPage;
