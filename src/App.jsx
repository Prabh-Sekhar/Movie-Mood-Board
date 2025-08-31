import { useState, useEffect } from 'react'
import './App.css'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import ResultPage from './pages/ResultPage'
import ResultPageLayout from './layout/ResultPageLayout'

function App() {
  const API_KEY = "5dc1ad459cf1db2a5a4406ee2dabbbe0"

  const [movie, setMovie] = useState([])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => setMovie(data.results))
  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<HomePage />} />

        {/* 🔹 Genre results */}
        <Route path='results' element={<ResultPageLayout />}>
          <Route path=":genreId/:pageNo" element={<ResultPage />} />
        </Route>

        {/* 🔹 Search results */}
        <Route path='results/search' element={<ResultPageLayout />}>
          <Route path=":query/:pageNo" element={<ResultPage />} />
        </Route>

        <Route path='*' element={<ErrorPage />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App