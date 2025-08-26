import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import "./LatestMovies.css"

export default function LatestMovies() {
    const [movies, setMovies] = useState([])
    const apiKey = "5dc1ad459cf1db2a5a4406ee2dabbbe0"
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results || [])
            })
            .catch(err => console.error("Error fetching latest movies:", err))
    }, [])

    return (
        <div className="latest-movies-section">
            <div className="section-header">
                <h1 className="section-title">Latest Movies</h1>
                <a href="#" className="view-all">View All →</a>
            </div>

            <div className="movies-grid">
                {movies.slice(0, 6).map(movie => (
                    <MovieCard
                        key={movie.id}
                        img={movie.poster_path}
                        title={movie.title}
                        release={movie.release_date}
                        rating={movie.vote_average}
                    />
                ))}
            </div>
        </div>
    )
}
