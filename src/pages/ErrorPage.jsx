import './ErrorPage.css'
import LightRays from "../components/Background"
import Navbar from "../components/Navbar"
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {

    const navigate = useNavigate();

    return (
        <>
            <LightRays
                raysOrigin="top-center"
                raysColor="#00ffff"
                raysSpeed={1.5}
                lightSpread={0.8}
                rayLength={1.2}
                followMouse={true}
                mouseInfluence={0.1}
                noiseAmount={0.1}
                distortion={0.05}
                className="custom-rays"
            />
            {/* <Navbar /> */}
            {/* <img src={ErrorIcon} alt="error icon" id='error-icon'/> */}
            <h1 id='oops'><span id='blur'>Oops!</span></h1>
            <h1 id="error-message">404: Page not found!</h1>
            <button id='gohome-button' onClick={() => navigate('/')}>Go Home</button>
        </>
    )
}