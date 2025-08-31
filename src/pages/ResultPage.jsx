import React, { useEffect, useRef } from 'react';
import './ResultPage.css';
import { useParams } from 'react-router-dom';
import ResultMovieCard from '../components/ResultMovieCard';
import Dropdown from '../components/Dropdown';
import filter from '../assets/filter.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilterOpen,
  setSelectedSort,
  setMovies,
  setLoading,
  setSearchQuery,
  setGenreList,
  setPageNo,
  setTotalPages,
  setTotalResults,
} from '../redux/resultPageSlice';

const sortOptions = [
  { value: 'popularity.desc', label: 'By popularity desc' },
  { value: 'popularity.asc', label: 'By popularity asc' },
  { value: 'primary_release_date.desc', label: 'By release year desc' },
  { value: 'primary_release_date.asc', label: 'By release year asc' },
  { value: 'vote_average.desc', label: 'By rating desc' },
  { value: 'vote_average.asc', label: 'By rating asc' }
];

const API_KEY = "265ee9ad32f39faa85f23cbbf1e5eb6b";

function buildSearchApiUrl({ query, pageNo }) {
  return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${pageNo}&query=${encodeURIComponent(query)}`;
}

function buildDiscoverApiUrl({ genreList, selectedSort, pageNo }) {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=${pageNo}`;
  if (selectedSort) url += `&sort_by=${selectedSort}`;
  if (genreList && genreList.length > 0) {
    url += `&with_genres=${genreList.join('%2C')}`;
  }
  return url;
}

export default function ResultPage() {
  const { query, genreId, pageNo: paramPageNo } = useParams();
  const dispatch = useDispatch();
  const {
    filterOpen,
    selectedSort,
    movies,
    loading,
    searchQuery,
    genreList,
    pageNo,
    totalPages,
    totalResults,
  } = useSelector((state) => state.resultPage);

  const initialized = useRef(false);

  useEffect(() => {
    if (genreId) {
      dispatch(setGenreList([genreId]));
      dispatch(setSearchQuery(''));
    } else if (query) {
      dispatch(setSearchQuery(query));
      dispatch(setGenreList([]));
    } else {
      dispatch(setSearchQuery(''));
      dispatch(setGenreList([]));
    }
    if (paramPageNo) dispatch(setPageNo(Number(paramPageNo)));
    initialized.current = true;
  }, [query, genreId, paramPageNo, dispatch]);

  useEffect(() => {
    async function fetchMovies() {
      dispatch(setLoading(true));
      try {
        let json, results;
        if (searchQuery && searchQuery.trim() !== '') {
          const url = buildSearchApiUrl({ query: searchQuery, pageNo });
          const res = await fetch(url);
          json = await res.json();
          results = json.results || [];

          // Apply client-side sorting for search results
          if (selectedSort) {
            const [sortField, sortOrder] = selectedSort.split('.');
            results = [...results].sort((a, b) => {
              let aVal, bVal;
              if (sortField === 'popularity') {
                aVal = a.popularity; bVal = b.popularity;
              } else if (sortField === 'primary_release_date') {
                aVal = a.release_date || ''; bVal = b.release_date || '';
              } else if (sortField === 'vote_average') {
                aVal = a.vote_average; bVal = b.vote_average;
              } else {
                aVal = 0; bVal = 0;
              }
              if (sortOrder === 'asc') return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
              else return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
            });
          }

          dispatch(setMovies(results));
          dispatch(setTotalPages(json.total_pages || 1));
          dispatch(setTotalResults(json.total_results || 0));

        } else {
          const url = buildDiscoverApiUrl({
            genreList,
            selectedSort: selectedSort || 'popularity.desc',
            pageNo,
          });
          const res = await fetch(url);
          json = await res.json();
          dispatch(setMovies(json.results || []));
          dispatch(setTotalPages(json.total_pages || 1));
          dispatch(setTotalResults(json.total_results || 0));
        }
      } catch (e) {
        dispatch(setMovies([]));
        dispatch(setTotalPages(1));
        dispatch(setTotalResults(0));
      }
      dispatch(setLoading(false));
    }
    fetchMovies();
  }, [searchQuery, genreList, selectedSort, pageNo, dispatch]);

  const handleApply = (newSort) => {
    dispatch(setSelectedSort(newSort));
    dispatch(setPageNo(1));
    dispatch(setFilterOpen(false));
  };

  const handleCancel = () => {
    dispatch(setFilterOpen(false));
  };

  return (
    <div className="result-page">
      <main className="result-main">
        <div className="result-browse-row">
          <span className="result-browse-title">
            <span className="result-browse-title-bar"></span>
            <span>
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : genreList && genreList.length > 0
                  ? "Genre Results"
                  : "Popular Movies"}
            </span>
          </span>
          <div className="result-browse-filter-btn-wrap">
            <button
              className="result-browse-filter-btn"
              onClick={() => dispatch(setFilterOpen(!filterOpen))}
            >
              <img width="18" height="18" fill="#5442F4" src={filter} alt="filter" />
              <span>Sort</span>
            </button>
          </div>
        </div>
        {filterOpen && (
          <Dropdown
            sortOptions={sortOptions}
            onClose={() => dispatch(setFilterOpen(false))}
            onApply={handleApply}
            onCancel={handleCancel}
            initialSelectedSort={selectedSort}
          />
        )}
        <div className="result-grid" style={{ marginTop: filterOpen ? 20 : 30 }}>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : movies.length === 0 ? (
            <div className="no-results">No results found.</div>
          ) : (
            movies.map((movie) => (
              <ResultMovieCard
                key={movie.id}
                img={movie.poster_path}
                title={movie.title}
                release={movie.release_date}
                rating={movie.vote_average}
              />
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={pageNo === 1}
              onClick={() => dispatch(setPageNo(pageNo - 1))}
            >
              Prev
            </button>

            <span>{pageNo} / {totalPages}</span>

            <button
              disabled={pageNo === totalPages}
              onClick={() => dispatch(setPageNo(pageNo + 1))}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}