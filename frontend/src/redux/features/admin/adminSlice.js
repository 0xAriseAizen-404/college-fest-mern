import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    currentAdmin: JSON.parse(localStorage.getItem("adminInfo")) || null,
    admins: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCurrAdmin: (state, action) => {
      state.currentAdmin = action.payload;
    },
    setAdmins: (state, action) => {
      state.admins = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCurrAdmin, setAdmins, setLoading, setError } =
  adminSlice.actions;

export default adminSlice.reducer;
