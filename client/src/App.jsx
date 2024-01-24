/* eslint-disable no-unused-vars */
import { RouterProvider } from "react-router";
import { router } from "./routers/router";
import { socket } from "./socket";
import { Provider } from "react-redux";
import { store } from "../app/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
