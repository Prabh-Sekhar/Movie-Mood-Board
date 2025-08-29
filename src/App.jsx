import { useState, useEffect } from 'react'
import Navbar from "./components/Navbar"
import './App.css'
import Favourites from './components/Favourites'
import MovieTile from './components/MovieTile'
import MovieCard from './components/MovieCard'
import SearchBar from './components/searchBar'
import MovieDetails from './components/movieDetails'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import ResultPage from './pages/ResultPage'
import { Route, createBrowserRouter, createRoutesFromChildren, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import ResultLayout from './layout/ResultLayout'

function App() {
  const API_KEY = "5dc1ad459cf1db2a5a4406ee2dabbbe0"

  const [favouritesOpen, setFavouritesOpen] = useState(true);
  
  const [movie, setMovie] = useState([{
      adult: false,
      backdrop_path: "/kqHypb4MdEBUFiphf49bK99T4cn.jpg",
      genre_ids: [878, 53],
      id: 755898,
      original_language: 'en',
      original_title: 'War of the Worlds',
      overview: "Will Radford is a top analyst for Homeland Security who tracks potential threats through a mass surveillance program, until one day an attack by an unknown entity leads him to question whether the government is hiding something from him... and from the rest of the world.",
      popularity: 1396.378,
      poster_path: "/yvirUYrva23IudARHn3mMGVxWqM.jpg",
      release_date: "2025-07-29",
      title: "War of the Worlds",
      video: false,
      vote_average: 4.206,
      vote_count: 330
  }])

  let result;
  useEffect(() => {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => setMovie(data.results))
  }, [])

  const [genres, setGenres] = useState([]);

  useEffect(() => {
      const fetchGenres = async () => {
          try {
              const res = await fetch(
                  `https://api.themoviedb.org/3/genre/movie/list?api_key=5dc1ad459cf1db2a5a4406ee2dabbbe0&language=en-US`
              );
              const data = await res.json();
              setGenres(data.genres || []);
          } catch (err) {
              console.error("Error fetching genres:", err);
          }
      };

      fetchGenres();
  }, []);

  console.log(genres);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<HomePage />}/>
        <Route path='results' element={<ResultLayout />}>
          {genres.map((genre) => (
            <Route path={`genre/${genre.id}`} element={<ResultPage genre={genre.name}/>}/>
          ))}
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router}/>
  )
}

export default App
