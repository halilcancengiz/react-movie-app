import React from 'react';
import { Routes as RouteContainer, Route } from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import HomeLayout from '../components/Layouts/HomeLayout';
import Main from '../pages/Main';
import SearchList from '../components/SearchList';
import Login from '../pages/membership/Login';
import Register from '../pages/membership/Register';
import Profile from '../pages/Profile';
// import PopularMoviesLayout from '../components/Layouts/PopularMoviesLayout';
import Popular from '../pages/Popular';
import TopRatedMovies from '../pages/TopRatedMovies';
import PersonDetails from '../pages/PersonDetails';

const LazyPopularMoviesLayout = React.lazy(() => import("../components/Layouts/PopularMoviesLayout"))
const LazyTopRatedMoviesLayout = React.lazy(() => import("../components/Layouts/TopRatedMoviesLayout"))
const LazyMovieDetails = React.lazy(() => import("../pages/MovieDetails"))
import NotFound from '../pages/NotFound';

const Routes = () => {
  const selectUser = (state) => state.auth.user;
  const getUser = createSelector(
    selectUser,
    (user) => user
  );
  const user = useSelector(getUser);

  return (
    <RouteContainer basename="/react-movie-app">
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Main />} />
        <Route path="/react-movie-app/" element={<Main />} />
        <Route path="/search/:query" element={<SearchList />} />
        {!user && <Route path="login" element={<Login />} />}
        {!user && <Route path="register" element={<Register />} />}
      </Route>

      {user && <Route path="/profile/:userName" element={<Profile />} />}

      <Route path="/popular-movies" element={
        <React.Suspense>
          <LazyPopularMoviesLayout />
        </React.Suspense>
      }>
        <Route index element={<Popular />} />
        <Route path="/popular-movies/page=:currentpage" element={<Popular />} />
      </Route>

      <Route path="/top-rated-movies" element={
        <React.Suspense>
          <LazyTopRatedMoviesLayout />
        </React.Suspense>
      }>
        <Route index element={<TopRatedMovies />} />
        <Route path="/top-rated-movies/page=:currentpage" element={<TopRatedMovies />} />
      </Route>

      <Route path="/person/:personName/:personId" element={<PersonDetails />} />

      <Route path="/movie/:id/:title" element={
        <React.Suspense>
          <LazyMovieDetails />
        </React.Suspense>} />

      <Route path="*" element={<NotFound />} />
    </RouteContainer>
  );
};

export default Routes;
