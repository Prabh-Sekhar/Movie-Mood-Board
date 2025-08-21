import React from 'react';
import './movieDetails.css';
import star from '../assets/star.svg';
import heart from '../assets/heart.svg';

export default function MovieDetails() {
  // Dummy data
  const movie = {
    poster: "https://images.news18.com/ibnlive/uploads/2025/08/haklasrkmeme-2025-08-3cb7481ad78b1e34f5762c33e69bba10-3x2.jpg",
    title: "Hakla",
    imdb: "7.5",
    hd: true,
    rating: "PG-13",
    year: "2025",
    duration: "129 min",
    description: "Aliqua anim adipisicing deserunt sunt cillum adipisicing laborum qui nulla. Ad nostrud elit occaecat et nulla ut. Laboris do cillum magna dolor. Laborum duis aliqua duis ex consectetur reprehenderit. Non sit quis ullamco consequat eu occaecat eiusmod nisi ex.",
    country: "Australia, Canada",
    director: "James Gunn",
    cast: ["Rachel Brosnahan", "Nicholas Hoult", "David Corenswet"],
    genres: ["Action", "Adventure", "Sci-Fi"],
    released: "Jul 11, 2025",
    productions: ["Troll Court Entertainment", "Domain Entertainment", "DC Studios"],
    ratingValue: 4.7,
    ratingVotes: 156,

    background: "https://images.news18.com/ibnlive/uploads/2025/08/haklasrkmeme-2025-08-3cb7481ad78b1e34f5762c33e69bba10-3x2.jpg"
  };

  return (
    <div className="movie-details-bg"  style={{
        backgroundImage: `linear-gradient(to right, rgba(21, 21, 21, 0.94) 20%, rgba(21, 21, 21, 0.82) 56%, rgba(21, 21, 21, 0.2) 100%),url(${movie.background})`
      }}>
      <div className="movie-details-container">
        <img src={movie.poster} alt={movie.title} className="movie-details-poster" />
        <div className="movie-details-main">
          <h1 className="movie-details-title">{movie.title}</h1>
          <div className="movie-details-tags">
            <span className="movie-details-tag imdb">IMDb {movie.imdb}</span>
            {movie.hd && <span className="movie-details-tag hd">HD</span>}
            <span className="movie-details-tag rating">{movie.rating}</span>
            <span className="movie-details-tag year">{movie.year}</span>
            <span>
              <button className="movie-details-fav-tag">
              
              <img src={heart} width="28" height="28" style={{color: 'white'}}></img>
            </button>
            </span>
          </div>
          <p className="movie-details-desc">{movie.description}</p>
          <div className="movie-details-extra">
            <div className="movie-details">
              <div>
                <span className="movie-details-label">Country:</span> {movie.country}
              </div>
              <div>
                <span className="movie-details-label">Director:</span> {movie.director}
              </div>
              <div>
                <span className="movie-details-label">Casts:</span> {movie.cast.join(', ')}
              </div>
            </div>
            <div className="movie-details">
              <div>
                <span className="movie-details-label">Genres: </span> 
                <span className="movie-details-bol">{movie.genres.join(', ')}</span>
              </div>
              <div>
                <span className="movie-details-label">Released:</span> {movie.released}
              </div>
              <div>
                <span className="movie-details-label">Productions: </span> 
                <span className="movie-details-bol">{movie.productions.join(', ')}</span>
              </div>
            </div>
          </div>
          <div className="movie-details-actions">
            {/* <button className="movie-details-play">
              
            </button> */}
            <div className="movie-details-rating">
              
              {Array.from({length: 5}).map((item, index) => (
                <img src={star} width="25" height="25"></img>
              ))}
              <span className="movie-details-rating-value">{movie.ratingValue} of 5 ({movie.ratingVotes} voted)</span>
            </div>
            {/* <button className="movie-details-fav">
              
              <img src={heart} width="25" height="25" style={{color: 'white'}}></img>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}