import { Outlet } from "react-router";

function BaseLayout() {
  return (
    <>
      {/* NAVBAR */}
      <Outlet />
    </>
  );
}

export default BaseLayout;
