import './MovieCard.css'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieDetailsSmall from './MovieDetailsSmall'

export default function MovieCard({ id, img, title, release, rating }) {
    const [showDetails, setShowDetails] = useState(false)
    const navigate = useNavigate()
    const posterBaseUrl = "https://image.tmdb.org/t/p/w500"
    const timeoutRef = useRef(null)

    const handleCardClick = () => {
        if (!showDetails) {
            navigate(`/movie/${id}`)
        }
    }

    const handleQuestionMarkClick = (e) => {
        e.stopPropagation()
        e.preventDefault()

        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        setShowDetails(prev => !prev)
    }

    const handleMouseLeave = () => {
        // Add a small delay before hiding to prevent flickering
        timeoutRef.current = setTimeout(() => {
            setShowDetails(false)
        }, 200)
    }

    const handleMouseEnter = () => {
        // Clear timeout if mouse re-enters
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }

    return (
        <div
            className='card-container'
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            <div className="movie-card" onClick={handleCardClick}>
                <img
                    src={img ? `${posterBaseUrl}${img}` : "/placeholder.jpg"}
                    alt={title || "Movie Poster"}
                    className="movie-poster"
                />

                <div
                    className="question-mark"
                    onClick={handleQuestionMarkClick}
                >
                    ?
                </div>

                <h2 className="movie-title">{title || "Untitled"}</h2>

                <div className="movie-footer">
                    <span className="release-year">
                        {release ? release.slice(0, 4) : "N/A"}
                    </span>
                    <div className="rating">
                        <svg className="star-icon" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 
                            1.18 6.88L12 17.77l-6.18 3.25L7 14.14 
                            2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="rating-text">
                            {rating ? rating.toFixed(1) : "–"}
                        </span>
                    </div>
                </div>

                {/* Small Details Popup */}
                {showDetails && (
                    <MovieDetailsSmall
                        id={id}
                        visible={showDetails}
                    />
                )}
            </div>
        </div>
    )
}