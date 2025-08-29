import React from 'react';
import './MovieResultCard.css';

export default function MovieResultCard({ movie }) {
  const lang = movie.original_language.toUpperCase();
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="movie-card">
      <div className="movie-card-img-wrap">
        <img src={posterBaseUrl + movie.poster_path}  alt={movie.title} className="movie-card-img" />
        {<span className="movie-card-hd">HD</span>}
      </div>
      <div className="movie-card-info">
        <div className="movie-card-title">{movie.title}</div>
        <div className="movie-card-meta">
          {/* {movie.type === "TV" ? (
            <>
              <span>TV</span>
              <span>SS{movie.season}</span>
              <span>EP{movie.episode}</span>
            </>
          ) : ( */}
            <>
              <span>Movie</span>
              <span>{movie.release_date.substring(0,4)}</span>
              <span>{lang}</span>
            </>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}