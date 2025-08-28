import { useEffect, useState } from "react";
import "./HeroSection.css";

const API_KEY = "5dc1ad459cf1db2a5a4406ee2dabbbe0";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/original";

export default function HeroSection() {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const res = await fetch(
                    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
                );
                const data = await res.json();
                setMovies(data.results.slice(0, 10));
            } catch (err) {
                console.error("Error fetching movies:", err);
            }
        }

        async function fetchGenres() {
            try {
                const res = await fetch(
                    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
                );
                const data = await res.json();
                const genreMap = {};
                data.genres.forEach((g) => {
                    genreMap[g.id] = g.name;
                });
                setGenres(genreMap);
            } catch (err) {
                console.error("Error fetching genres:", err);
            }
        }

        fetchMovies();
        fetchGenres();
    }, []);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % movies.length);
    const prevSlide = () =>
        setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));

    if (movies.length === 0) return <div className="hero-loading">Loading...</div>;

    const movie = movies[currentIndex];

    // Map genres properly
    const genreNames = movie.genre_ids
        ?.map((id) => genres[id])
        .filter(Boolean)
        .join(", ");

    return (
        <div className="hero">
            {/* Background with gradient overlay */}
            <div
                className="hero-bg"
                style={{ backgroundImage: `url(${IMAGE_URL + movie.backdrop_path})` }}
            >
                <div className="hero-gradient"></div>
            </div>

            <div className="hero-overlay">
                <div className="hero-content">
                    <h1 className="hero-title">{movie.title}</h1>
                    <div className="hero-meta">
                        <span className="tag imdb">IMDb {movie.vote_average.toFixed(1)}</span>
                        <span className="tag rating">{movie.adult ? "R" : "PG"}</span>
                        <span>{movie.release_date?.slice(0, 4)}</span>
                        {genreNames && <span>{genreNames}</span>}
                    </div>
                    <p className="hero-description">
                        {movie.overview.length > 200
                            ? movie.overview.slice(0, 200) + "..."
                            : movie.overview}
                    </p>
                    <div className="hero-buttons">
                        <button className="info-btn">More Info</button>
                    </div>
                </div>

                {/* Carousel Controls */}
                <div className="carousel-controls">
                    <button className="nav-btn small" onClick={prevSlide}>
                        ‹
                    </button>
                    <span className="carousel-index">
                        {currentIndex + 1}/{movies.length}
                    </span>
                    <button className="nav-btn small" onClick={nextSlide}>
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
}
