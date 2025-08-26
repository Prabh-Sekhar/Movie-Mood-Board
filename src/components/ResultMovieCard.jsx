import './ResultMovieCard.css'

export default function ResultMovieCard(props) {
    const posterBaseUrl = "https://image.tmdb.org/t/p/w500"

    return (
        <div id="movie-card">
            <div id="poster-wrapper">
                <img
                    src={posterBaseUrl + props.img}
                    alt={props.title}
                    id="movie-poster"
                />
                <div id="overlay-gradient"></div>
                <div id="movie-info">
                    <h2 id="movie-title">{props.title}</h2>
                    <div id="movie-meta">
                        <span id="release-year">
                            {props.release ? props.release.slice(0, 4) : "N/A"}
                        </span>
                        <div id="rating">
                            <svg id="star-icon" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 
                                1.18 6.88L12 17.77l-6.18 3.25L7 
                                14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <span id="rating-text">
                                {props.rating ? props.rating.toFixed(1) : "–"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}