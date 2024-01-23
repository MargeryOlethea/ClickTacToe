import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const initialState = {
  myGame: {},
  loading: false,
  error: "",
};

export const myGameSlice = createSlice({
  name: "myGame",
  initialState,
  reducers: {
    fetchMyGamePending(state) {
      state.loading = true;
      state.myGame = {};
      state.error = "";
    },
    fetchMyGameResolved(state, action) {
      state.loading = false;
      state.myGame = action.payload;
    },
    fetchMyGameRejected(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMyGamePending, fetchMyGameRejected, fetchMyGameResolved } =
  myGameSlice.actions;

export const fetchMyGameThunk = () => async (dispatch) => {
  try {
    dispatch(fetchMyGamePending());

    const { data } = await axios.get(`${url}/mygames`, {
      headers: { Authorization: `Bearer ${localStorage.access_token}` },
    });

    dispatch(fetchMyGameResolved(data));
  } catch (error) {
    dispatch(fetchMyGameRejected(error.response.data.message));
  }
};

export default myGameSlice.reducer;
