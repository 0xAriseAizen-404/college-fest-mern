import { createSlice } from "@reduxjs/toolkit";

const participantSlice = createSlice({
  name: "participants",
  initialState: {
    participants: [],
    loading: false,
    error: null,
  },
  reducers: {
    setParticipants: (state, action) => {
      state.participants = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setParticipants, setLoading, setError } =
  participantSlice.actions;

export default participantSlice.reducer;
