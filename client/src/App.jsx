import { RouterProvider } from "react-router";
import { router } from "./routers/router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
