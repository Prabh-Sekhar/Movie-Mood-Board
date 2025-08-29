import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  details: null,
  credits: null,
  error: null,
};

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    setLoading: (state, action) => { state.loading = action.payload; },
    setDetails: (state, action) => { state.details = action.payload; },
    setCredits: (state, action) => { state.credits = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
    reset: (state) => {
      state.loading = true;
      state.details = null;
      state.credits = null;
      state.error = null;
    }
  }
});
export const { setLoading, setDetails, setCredits, setError, reset } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;