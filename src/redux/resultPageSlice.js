import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterOpen: false,
  selectedSort: 'popularity.desc', 
  movies: [],
  loading: false,
  searchQuery: '',   
  genreList: [],     
  pageNo: 1,
};

const resultPageSlice = createSlice({
  name: 'resultPage',
  initialState,
  reducers: {
    setFilterOpen(state, action) {
      state.filterOpen = action.payload;
    },
    setSelectedSort(state, action) {
      state.selectedSort = action.payload;
    },
    setMovies(state, action) {
      state.movies = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setGenreList(state, action) {
      state.genreList = action.payload;
    },
    setPageNo(state, action) {
      state.pageNo = action.payload;
    },
    resetFilters(state) {
      state.selectedSort = 'popularity.desc';
      state.pageNo = 1;
    }
  }
});

export const {
  setFilterOpen,
  setSelectedSort,
  setMovies,
  setLoading,
  setSearchQuery,
  setGenreList,
  setPageNo,
  resetFilters
} = resultPageSlice.actions;

export default resultPageSlice.reducer;