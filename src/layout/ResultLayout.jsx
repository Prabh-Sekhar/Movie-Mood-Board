import { Outlet } from 'react-router-dom'
import ResultPage from '../pages/ResultPage'

export default function ResultLayout() {
    return(
        <div>
            <Outlet />
        </div>
    )
}