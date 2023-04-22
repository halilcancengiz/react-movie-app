import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import UseRedux from './hooks/useRedux';
import HomeLayout from './components/Layouts/HomeLayout';
import Main from './pages/Main';
import SearchList from './components/SearchList';
import Login from './pages/membership/Login';
import Register from './pages/membership/Register';
import Profile from './pages/Profile';
import PopularMoviesLayout from './components/Layouts/PopularMoviesLayout';
import Popular from './pages/Popular';
import TopRatedMoviesLayout from './components/Layouts/TopRatedMoviesLayout';
import TopRatedMovies from './pages/TopRatedMovies';
import PersonDetails from './pages/PersonDetails';
import MovieDetails from './pages/MovieDetails';
import NotFound from './pages/NotFound';

export default function App() {
  const { pathname } = useLocation()
  const { user } = UseRedux()

  return (
    <div style={{ background: "linear-gradient(to right, rgba(10 37 62,.9),rgba(10 37 62,.9))" }} className='App'>
      {
        pathname.startsWith("/register") || pathname.startsWith("/login") ? "" : <Navbar />
      }

      <Routes basename="/react-movie-app">
        <Route path='/' element={<HomeLayout />}>
          <Route index={true} element={<Main />} />
          <Route path="/react-movie-app/" element={<Main />} />
          <Route path='/search/:query' element={<SearchList />} />
          {user ? "" : <Route path="login" element={<Login />} />}
          {user ? "" : <Route path="register" element={<Register />} />}
        </Route>

        {user ? <Route path="/profile/:userName" element={<Profile />} /> : ""}


        <Route path='/popular-movies' element={<PopularMoviesLayout />}>
          <Route index element={<Popular />} />
          <Route exact path='?page=:currentpage' element={<Popular />} />
        </Route>

        <Route path='/top-rated-movies' element={<TopRatedMoviesLayout />}>
          <Route index element={<TopRatedMovies />} />
          <Route path='?page=:currentpage' element={<TopRatedMovies />} />
        </Route>

        <Route path="/person/:personName/:personId" element={<PersonDetails />} />

        <Route path='/movie/:id/:title' element={<MovieDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster position="top-right" />
      {
        pathname.startsWith("/register") || pathname.startsWith("/login") ? "" : <Footer />
      }

    </div >
  )
}
