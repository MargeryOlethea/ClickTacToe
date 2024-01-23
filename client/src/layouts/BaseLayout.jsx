import { Outlet } from "react-router";
import Nav from "../components/Nav";

function BaseLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default BaseLayout;
