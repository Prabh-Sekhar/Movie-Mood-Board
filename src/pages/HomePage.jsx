import LightRays from "../components/Background"
import Favourites from "../components/Favourites"
import LatestMovies from "../components/LatestMovies"
import MovieCard from "../components/MovieCard"
import MovieTile from "../components/MovieTile"
import Navbar from "../components/Navbar"
import PopularMovies from "../components/PopularMovies"

export default function HomePage () {
    return (
        <>
            <LightRays
                raysOrigin="top-center"
                raysColor="#5442F4"
                raysSpeed={1.5}
                lightSpread={0.8}
                rayLength={1.2}
                followMouse={true}
                mouseInfluence={0.1}
                noiseAmount={0.1}
                distortion={0.05}
                className="custom-rays"
            />
            <Navbar />

            
            <MovieTile tileTitle="Trending Now"/>
            <LatestMovies />
            <PopularMovies />

        </>
    )
}