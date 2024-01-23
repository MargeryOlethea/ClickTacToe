import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "../src/features/roomsSlice";

export const store = configureStore({
  reducer: { rooms: roomsReducer },
});
