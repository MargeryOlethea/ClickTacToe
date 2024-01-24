import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const initialState = {
  game: {},
  loading: false,
  error: "",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    fetchGamePending(state) {
      state.loading = true;
      state.game = {};
      state.error = "";
    },
    fetchGameResolved(state, action) {
      state.loading = false;
      state.game = action.payload;
    },
    fetchGameRejected(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchGamePending, fetchGameRejected, fetchGameResolved } =
  gameSlice.actions;

export const fetchGameThunk =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch(fetchGamePending());

      const { data } = await axios.get(`${url}/rooms/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      dispatch(fetchGameResolved(data));
    } catch (error) {
      dispatch(fetchGameRejected(error.response.data.message));
    }
  };

export default gameSlice.reducer;
