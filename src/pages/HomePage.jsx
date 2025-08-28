import LightRays from "../components/Background"
import Favourites from "../components/Favourites"
import GradientText from "../components/GradientText"
import HeroSection from "../components/HeroSection"
import LatestMovies from "../components/LatestMovies"
import MovieCard from "../components/MovieCard"
import MovieTile from "../components/MovieTile"
import Navbar from "../components/Navbar"
import PopularMovies from "../components/PopularMovies"

export default function HomePage () {
    return (
        <>
            {/* <LightRays
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
            /> */}

            <Navbar />
            <HeroSection /> 

            <GradientText 
                colors={["#7a6cfcff", "#83aef4ff", "#9b90ffff", "#95b6ffff", "#8f85eeff"]}
                animationSpeed={3}
                showBorder={false}
                className="custom-class"
            >
                TRENDING  NOW
            </GradientText>

            
            <MovieTile tileTitle="Trending Now"/>
            <LatestMovies />
            <PopularMovies />

        </>
    )
}