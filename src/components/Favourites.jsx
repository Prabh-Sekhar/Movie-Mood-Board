import './Favourites.css'
import MovieCard from './MovieCard';

export default function Favourites({ movie }) {
    
    const favouritesVisible = false;
    
    return(
        <div className='favourites'>
            <h1 className='favourites-heading'>Favourites</h1>
            <div className='favourites-inner'>
            {favouritesVisible && (
            <div className='favourites-default'>
                <p>Drag and drop movies to add to favourites</p>
                <span className="material-symbols-outlined">place_item</span>
            </div>
            )}
            {!favouritesVisible && 
                <div className='movie-card-container'>
                    {movie.map((movie) => {
                        return(
                            <MovieCard title={movie.title} img={movie.poster_path} release={movie.release_date} rating={movie.vote_average}/>
                        )
                    })}
            </div> }
        </div>
    </div>
    )
}