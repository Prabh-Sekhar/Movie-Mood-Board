import { useEffect, useState } from "react"
import "./MovieDetailsSmall.css"

const API_KEY = "5dc1ad459cf1db2a5a4406ee2dabbbe0";

export default function MovieDetailsSmall({ id, visible }) {
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const posterBaseUrl = "https://image.tmdb.org/t/p/w500"

    useEffect(() => {
        // Only fetch when both id exists and component is visible
        if (!visible || !id) {
            return // Don't reset state when not visible, just don't fetch
        }

        let isMounted = true // Prevent state updates if component unmounts

        const fetchMovie = async () => {
            if (!isMounted) return

            setLoading(true)
            setError(null)

            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
                )

                if (!response.ok) {
                    throw new Error(`Failed to fetch movie: ${response.status}`)
                }

                const data = await response.json()

                if (isMounted) {
                    if (data && !data.success === false) {
                        setMovie(data)
                    } else {
                        setError("Movie not found")
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message)
                    setMovie(null)
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchMovie()

        return () => {
            isMounted = false
        }
    }, [id, visible])

    // Don't render if not visible
    if (!visible) {
        return null
    }

    // Loading state
    if (loading) {
        return (
            <div className="movie-details-small">
                <div className="loading-content">
                    <p>Loading movie details...</p>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="movie-details-small">
                <div className="error-content">
                    <p>Error: {error}</p>
                </div>
            </div>
        )
    }

    // No movie data
    if (!movie || !movie.id) {
        return (
            <div className="movie-details-small">
                <div className="no-data-content">
                    <p>Unable to load movie details</p>
                </div>
            </div>
        )
    }

    // Success - render movie details
    return (
        <div className="movie-details-small">
            <div className="small-header">
                {movie.poster_path ? (
                    <img
                        src={`${posterBaseUrl}${movie.poster_path}`}
                        alt={movie.title || "Movie poster"}
                        className="small-poster"
                        onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                        }}
                    />
                ) : null}

                {!movie.poster_path && (
                    <div className="small-poster placeholder">
                        <span>No Image</span>
                    </div>
                )}

                <div className="small-meta">
                    <h3 className="small-title">
                        {movie.title || movie.original_title || "Untitled"}
                    </h3>
                    <p className="small-sub">
                        {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
                        {" • "}
                        {movie.runtime ? `${movie.runtime} min` : "Runtime N/A"}
                    </p>
                    <p className="small-genres">
                        {movie.genres && movie.genres.length > 0
                            ? movie.genres.map(genre => genre.name).join(", ")
                            : "Genres not available"}
                    </p>
                </div>
            </div>

            <div className="small-overview">
                <p>
                    {movie.overview
                        ? (movie.overview.length > 120
                            ? `${movie.overview.substring(0, 120)}...`
                            : movie.overview)
                        : "No description available."}
                </p>
            </div>
        </div>
    )
}