import React from 'react';
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Pagination from '../components/Pagination';
import MovieCard from '../components/MovieCard';
import { getTopRatedMovies } from '../services/tmdb/tmdb';
import { useTranslation } from 'react-i18next';
import SearchBar from '../components/SearchBar';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


function TopRatedMovies() {
    const selectLanguage = state => state.language;
    const getLanguage = createSelector(
        selectLanguage,
        language => language
    )
    const language = useSelector(getLanguage);

    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get("page") || 1;
    const { t } = useTranslation()

    const updateGetTopRatedMovies = useCallback(async () => {
        const result = await getTopRatedMovies(page, language)
        setTopRatedMovies(result)
    }, [page, language])

    useEffect(() => {
        updateGetTopRatedMovies()
    }, [updateGetTopRatedMovies])
    return (
        <main className='container mt-5 d-flex flex-column'>
            <Helmet>
                <title>{t("topRatedMovies")}</title>
                <meta name="description" content="Bu sayfada API'den gelen en çok oylanan filmler yer almaktadır." />
            </Helmet>
            <div className="mx-auto">
                <h4 className='m-0 p-0 text-center py-2 webkitHeader-h4 text-uppercase fw-bold'>{t("topRatedMovies")}</h4>
                <div className='designBorder'></div>
            </div>

            <div className="container d-flex align-items-center justify-content-center flex-wrap">
                {
                    topRatedMovies && topRatedMovies.length > 0 ? <MovieCard movieList={topRatedMovies} /> : ""
                }
            </div>
            <Pagination page={page} setSearchParams={setSearchParams} />
            <SearchBar />
        </main>
    )
}
export default TopRatedMovies