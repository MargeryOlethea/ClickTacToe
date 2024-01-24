import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "../src/features/roomsSlice";
import usersReducer from "../src/features/usersSlice";
import myGameReducer from "../src/features/myGameSlice";
import gameReducer from "../src/features/gameSlice";

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    users: usersReducer,
    myGame: myGameReducer,
    game: gameReducer,
  },
});
