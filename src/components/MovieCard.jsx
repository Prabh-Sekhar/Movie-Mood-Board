import './MovieCard.css'
import { useEffect, useState } from 'react'


export default function MovieCard(props) {
    const API_KEY = "5dc1ad459cf1db2a5a4406ee2dabbbe0"
    
    const posterBaseUrl = "https://image.tmdb.org/t/p/w500"

    return (
        <div className='card-container'>
            <div className="movie-card">
                <img src={posterBaseUrl + props.img} 
                alt="Movie Poster" className="movie-poster" />
                <h2 className="movie-title">{props.title}</h2>
                <div className="movie-details">
                    <span className="release-year">{props.release.slice(0, 4)}</span>
                    <div className="rating">
                        <svg className="star-icon" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span>{props.rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}