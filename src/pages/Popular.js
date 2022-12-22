/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react'
import { getPopularMovies } from '../services/tmdb/tmdb';
import Pagination from '../components/Pagination';
import MovieCard from './../components/MovieCard';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import "../css/popular.css"


export default function Popular() {
    const language = useSelector((state) => state.language.language)
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get("page") || 1;
    const [popularMovies, setPopularMovies] = useState([])

    const updateGetPopularMovies = useCallback(async () => {
        getPopularMovies(page, language).then(result => setPopularMovies(result))
    }, [page, language])

    useEffect(() => {
        updateGetPopularMovies()
        document.title = "Popüler Filmler"
    }, [updateGetPopularMovies])

    return (
        <main className='popular-page-container container mt-5 d-flex flex-column'>
            <div className='mx-auto'>
                <h4 className='m-0 p-0 text-center webkitHeader-h4 py-2 text-uppercase fw-bold'>Popüler Filmler</h4>
                <div className='designBorder'></div>
            </div>

            <div className="container d-flex align-items-center justify-content-center flex-wrap">
                {
                    popularMovies ? popularMovies.sort((a, b) => b.vote_average - a.vote_average).map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    )) : ""
                }

            </div>
            <Pagination page={page} setSearchParams={setSearchParams} />
        </main>
    )
}
