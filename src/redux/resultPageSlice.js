import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterOpen: false,
  selectedSort: 'popularity.desc',
  movies: [],
  loading: false,
  searchQuery: '',
  genreList: [],
  pageNo: 1,
  totalPages: 1,
  totalResults: 0,
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
      // For now replace movies. If infinite scroll is needed:
      // if (state.pageNo > 1) state.movies = [...state.movies, ...action.payload];
      // else state.movies = action.payload;
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
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setTotalResults(state, action) {
      state.totalResults = action.payload;
    },
    resetFilters(state) {
      state.selectedSort = 'popularity.desc';
      state.pageNo = 1;
      state.totalPages = 1;
      state.totalResults = 0;
    },
  },
});

export const {
  setFilterOpen,
  setSelectedSort,
  setMovies,
  setLoading,
  setSearchQuery,
  setGenreList,
  setPageNo,
  setTotalPages,
  setTotalResults,
  resetFilters,
} = resultPageSlice.actions;

export default resultPageSlice.reducer;