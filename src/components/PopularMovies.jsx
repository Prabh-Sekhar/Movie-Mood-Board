import { useEffect, useState } from "react"
import ResultMovieCard from "./ResultMovieCard"
import "./PopularMovies.css"

export default function PopularMovies() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const apiKey = "5dc1ad459cf1db2a5a4406ee2dabbbe0"
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`

    useEffect(() => {
        setLoading(true)
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setMovies(data.results || [])
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching latest movies:", err)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="latest-movies-section">
                <div className="section-header">
                    <h1 className="section-title">Popular Movies</h1>
                </div>
                <div className="loading">Loading movies...</div>
            </div>
        )
    }

    return (
        <div className="latest-movies-section">
            <div className="section-header">
                <h1 className="section-title">Popular Movies</h1>
                <span className="movie-count">{movies.length} movies</span>
            </div>

            <div className="movies-grid">
                {movies.map(movie => (
                    <ResultMovieCard
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