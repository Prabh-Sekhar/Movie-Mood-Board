import React, { useEffect } from 'react';
import './movieDetails.css';
import star from '../assets/star.svg';
import heart from '../assets/heart.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setDetails, setCredits, setError, reset } from '../redux/MovieDetailsSlice';


const API_KEY = "265ee9ad32f39faa85f23cbbf1e5eb6b";

export default function MovieDetails( {movie_id = 278}) {
  const dispatch = useDispatch();
  const { loading, details, credits, error } = useSelector(s => s.movieDetails);

  useEffect(() => {
    if (!movie_id) return;
    dispatch(reset());
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {

        const resDet = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`);
        const detailsData = await resDet.json();
        dispatch(setDetails(detailsData));
     
        const resCred = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}&language=en-US`);
        const creditsData = await resCred.json();
        dispatch(setCredits(creditsData));
      } catch (e) {
        dispatch(setError('Failed to load movie details.'));
      }
      dispatch(setLoading(false));
    };
    fetchData();
  }, [movie_id, dispatch]);

  if (loading) return <div className="movie-details-bg"><div className="movie-details-container"><div className="loading">Loading...</div></div></div>;
  if (error) return <div className="movie-details-bg"><div className="movie-details-container"><div className="error">{error}</div></div></div>;
  if (!details || !credits) return null;


  const poster = details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : '';
  const background = details.backdrop_path ? `https://image.tmdb.org/t/p/original${details.backdrop_path}` : '';
  const title = details.title || "";
  const imdb = details.vote_average ? details.vote_average.toFixed(1) : "";
  const year = (details.release_date || "").slice(0, 4);
  const rating = details.adult ? "18+" : "PG-13";
  const description = details.overview || "";
  const genres = (details.genres || []).map(g => g.name);
  const released = details.release_date ? new Date(details.release_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "";
  const productions = (details.production_companies || []).map(p => p.name);
  const country = (details.origin_country || []).join(', ');
  const runtime = details.runtime ? `${details.runtime} min` : "";
  const ratingValue = details.vote_average ? (details.vote_average / 2).toFixed(1) : ""; 
  const ratingVotes = details.vote_count || "";


  let castNames = [];
  if (credits.cast && credits.cast.length > 0) {
    castNames = credits.cast

      .slice(0, 4)
      .map(actor => actor.name);
  }

  return (
    <div className="movie-details-bg" style={{
      backgroundImage: `linear-gradient(to right, rgba(21, 21, 21, 0.94) 20%, rgba(21, 21, 21, 0.82) 56%, rgba(21, 21, 21, 0.2) 100%),url(${background})`
    }}>
      <div className="movie-details-container">
        <img src={poster} alt={title} className="movie-details-poster" />
        <div className="movie-details-main">
          <center><h1 className="movie-details-title">{title}</h1></center>
          <div className="movie-details-tags">
            <span className="movie-details-tag imdb">IMDb {imdb}</span>
            <span className="movie-details-tag rating">{rating}</span>
            <span className="movie-details-tag year">{year}</span>
            <span>
              <button className="movie-details-fav-tag">
                <img src={heart} width="28" height="28" style={{color: 'white'}} alt="favorite"/>
              </button>
            </span>
          </div>
          <p className="movie-details-desc">{description}</p>
          <div className="movie-details-extra">
            <div className="movie-details">
              <div>
                <span className="movie-details-label">Country:</span> {country}
              </div>
              <div>
                <span className="movie-details-label">Runtime:</span> {runtime}
              </div>
              <div>
                <span className="movie-details-label">Casts:</span> {castNames.join(', ')}
              </div>
            </div>
            <div className="movie-details">
              <div>
                <span className="movie-details-label">Genres: </span>
                <span className="movie-details-bol">{genres.join(', ')}</span>
              </div>
              <div>
                <span className="movie-details-label">Released:</span> {released}
              </div>
              <div>
                <span className="movie-details-label">Productions: </span>
                <span className="movie-details-bol">{productions.join(', ')}</span>
              </div>
            </div>
          </div>
          <div className="movie-details-actions">
            <div className="movie-details-rating">
              {Array.from({length: 5}).map((item, index) => (
                <img key={index} src={star} width="25" height="25" alt="star"/>
              ))}
              <span className="movie-details-rating-value">{ratingValue} of 5 ({ratingVotes} voted)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}