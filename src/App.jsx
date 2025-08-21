import { useState, useEffect } from 'react'
import './App.css'
import MovieCard from './components/MovieCard'
import Favourites from './components/Favourites'
import MovieTile from './components/ MovieTile'

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

  return (
    <div className='app-layout'>
      <div className={`favourites-container ${favouritesOpen ? "open" : "closed"}`}>
        {favouritesOpen && <Favourites movie={movie} />}
      </div>
      <div className='movie-card-container'>
        <MovieTile movie={movie} tileTitle="Trending Now"/>
      </div>
    </div>
  )
}

export default App
