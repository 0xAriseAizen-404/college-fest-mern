import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    category: {},
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCategories, setLoading, setError, setCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
