import './MovieCard.css'

export default function MovieCard(props) {
    const posterBaseUrl = "https://image.tmdb.org/t/p/w500"

    return (
        <div className='card-container'>
            <div className="movie-card">
                <img
                    src={posterBaseUrl + props.img}
                    alt={props.title}
                    className="movie-poster"
                />
                <h2 className="movie-title">{props.title}</h2>

                <div className="movie-footer">
                    <span className="release-year">
                        {props.release ? props.release.slice(0, 4) : "N/A"}
                    </span>
                    <div className="rating">
                        <svg className="star-icon" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="rating-text">
                            {props.rating ? props.rating.toFixed(1) : "–"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}