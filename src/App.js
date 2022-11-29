import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Popular from './pages/Popular'
import MovieDetails from './components/MovieDetails';
import Main from './pages/Main';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import TopRatedMovies from './pages/TopRatedMovies';
import PopularMoviesLayout from './components/Layouts/PopularMoviesLayout';
import TopRatedMoviesLayout from './components/Layouts/TopRatedMoviesLayout';
import HomeLayout from './components/Layouts/HomeLayout';
import MovieList from './components/MovieList';
import { BackTop } from 'antd';


export default function App() {
  return (
    <div style={{ background: "rgb(240,240,240)" }} className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route index element={<Main />} />
          <Route path='/:querry' element={<MovieList />} />
        </Route>

        <Route path='/popular-movies' element={<PopularMoviesLayout />}>
          <Route index element={<Popular />} />
          <Route path='?page=:currentpage' element={<Popular />} />
        </Route>
        <Route path='/top-rated-movies' element={<TopRatedMoviesLayout />}>
          <Route index element={<TopRatedMovies />} />
          <Route path='?page=:currentpage' element={<TopRatedMovies />} />
        </Route>
        {/* <Route path='/movie-details:id' element={<MovieDetails />} /> */}

        <Route path='/movie/:id/:title' element={<MovieDetails />} />


      </Routes>
      <Toaster position="top-right" />
      <Footer />
      <div>
        <BackTop visibilityHeight={200} />
      </div>
    </div>
  )
}
