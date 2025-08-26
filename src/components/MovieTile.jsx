import './MovieTile.css'
import MovieCard from './MovieCard'
import { useState, useEffect, useRef } from 'react'

export default function MovieTile(props) {
    const API_KEY = "5dc1ad459cf1db2a5a4406ee2dabbbe0"

    const [movie, setMovie] = useState([{
        adult: false,
        backdrop_path: "/kqHypb4MdEBUFiphf49bK99T4cn.jpg",
        genre_ids: [878, 53],
        id: 755898,
        original_language: 'en',
        original_title: 'War of the Worlds',
        overview: "Will Radford is a top analyst for Homeland Security who tracks potential threats...",
        popularity: 1396.378,
        poster_path: "/yvirUYrva23IudARHn3mMGVxWqM.jpg",
        release_date: "2025-07-29",
        title: "War of the Worlds",
        video: false,
        vote_average: 4.206,
        vote_count: 330
    }])

    const ITEM_WIDTH = 500;

    const [scrollPosition, setScrollPosition] = useState(0);

    const containerRef = useRef(null);

    const handleScroll = (scrollAmount) => {
        const newScrollPosition = scrollPosition + scrollAmount;

        setScrollPosition(newScrollPosition);

        containerRef.current.scrollLeft = newScrollPosition;
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
            .then(res => res.json())
            .then(data => {
                setMovie(data.results);
            });
    }, []);

    

    return (
        <div className='movietile-container'>
            <h1>{props.tileTitle}</h1>
            <div className="scroll-wrapper">
                <button className="scroll-btn left" onClick={() => {handleScroll(-ITEM_WIDTH)}}>
                    {"<"}
                </button>

                <div
                    className='moviecards'
                    ref={containerRef}
                >
                    {movie.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            title={movie.title}
                            img={movie.poster_path}
                            release={movie.release_date}
                            rating={movie.vote_average}
                        />
                    ))}
                </div>

                <button className="scroll-btn right" onClick={() => {handleScroll(ITEM_WIDTH)}}>
                    {">"}
                </button>
            </div>
        </div>
    )
}