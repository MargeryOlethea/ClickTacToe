import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const initialState = {
  rooms: {},
  loading: false,
  error: "",
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    fetchRoomsPending(state) {
      state.loading = true;
      state.rooms = {};
      state.error = "";
    },
    fetchRoomsResolved(state, action) {
      state.loading = false;
      state.rooms = action.payload;
    },
    fetchRoomsRejected(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchRoomsPending, fetchRoomsRejected, fetchRoomsResolved } =
  roomsSlice.actions;

export const fetchRoomsThunk = () => async (dispatch) => {
  try {
    dispatch(fetchRoomsPending());

    //TOKEN BOLEH DIAPUS!!!!!!!!
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ1c2VyMyIsImlhdCI6MTcwNjAwMDkxMH0.5R8vICH8qhxmCgpUkUJrQKZdyLyv0L0Keqyx1pfFSt4";

    const { data } = await axios.get(`${url}/rooms`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(fetchRoomsResolved(data));
  } catch (error) {
    dispatch(fetchRoomsRejected(error.response.data.message));
  }
};

export default roomsSlice.reducer;
