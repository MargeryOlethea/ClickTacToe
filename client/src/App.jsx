import { RouterProvider } from "react-router";
import { router } from "./routers/router";
import { socket } from "./socket";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
