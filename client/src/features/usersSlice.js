import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

const initialState = {
  users: {},
  loading: false,
  error: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersPending(state) {
      state.loading = true;
      state.users = {};
      state.error = "";
    },
    fetchUsersResolved(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersRejected(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUsersPending, fetchUsersRejected, fetchUsersResolved } =
  usersSlice.actions;

export const fetchUsersThunk = () => async (dispatch) => {
  try {
    dispatch(fetchUsersPending());

    const { data } = await axios.get(`${url}/user`, {
      headers: { Authorization: `Bearer ${localStorage.access_token}` },
    });

    dispatch(fetchUsersResolved(data));
  } catch (error) {
    dispatch(fetchUsersRejected(error.response.data.message));
  }
};

export default usersSlice.reducer;
