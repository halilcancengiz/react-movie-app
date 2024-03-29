import { useEffect, useState, useCallback } from 'react'
import Pagination from '../components/Pagination';
import MovieCard from './../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { getPopularMovies } from '../services/tmdb/tmdb';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import "../css/popular.css"
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


const Popular = () => {
  const selectLanguage = state => state.language;
  const getLanguage = createSelector(
    selectLanguage,
    language => language
  )
  const language = useSelector(getLanguage);

  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get("page") || 1;
  const [popularMovies, setPopularMovies] = useState([])
  const { t } = useTranslation()

  const updateGetPopularMovies = useCallback(async () => {
    getPopularMovies(page, language.language).then(result => setPopularMovies(result))
  }, [page, language])

  useEffect(() => {
    updateGetPopularMovies()
  }, [updateGetPopularMovies])

  return (
    <main className='popular-page-container container mt-5 d-flex flex-column'>
      <Helmet>
        <title>{t("popularMovies")}</title>
        <meta name='description' content="Bu sayfada API'den gelen popüler filmler yer almaktadır." />
      </Helmet>

      <div className='mx-auto'>
        <h4 className='m-0 p-0 text-center webkitHeader-h4 py-2 text-uppercase fw-bold'>{t("popularMovies")}</h4>
        <div className='designBorder'></div>
      </div>

      <div className="container d-flex align-items-center justify-content-center flex-wrap">
        {
          popularMovies && popularMovies.length > 0 ? (
            <MovieCard movieList={popularMovies.sort((a, b) => b.vote_average - a.vote_average)} />) : ""
        }
      </div>
      <Pagination page={page} setSearchParams={setSearchParams} />
      <SearchBar />
    </main>
  )
}

export default Popular