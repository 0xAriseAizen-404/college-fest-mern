import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "events",
  initialState: {
    event: {},
    events: [],
    loading: false,
    error: null,
  },
  reducers: {
    setEvent: (state, action) => {
      state.event = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setEvents, setLoading, setError, setEvent } = eventSlice.actions;

export default eventSlice.reducer;
