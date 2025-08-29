import { configureStore } from '@reduxjs/toolkit';
import resultPageReducer from './resultPageSlice';
import movieDetailsReducer from './MovieDetailsSlice';

const store = configureStore({
  reducer: {
    resultPage: resultPageReducer,
    movieDetails: movieDetailsReducer,
  },
});

export default store;
