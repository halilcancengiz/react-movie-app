import React, { useEffect, useState } from 'react';
import { getMovieCredits } from '../services/tmdb/tmdb';
import { useParams } from 'react-router-dom';
import Actors from '../components/Actors';
import MovieTeam from '../components/MovieTeam';
import MovieTrailer from '../components/MovieTrailer';
import SimilarMovies from '../components/SimilarMovies';
import Loading from '../components/Loading';
import MovieInfo from './../components/MovieInfo';
import MovieComments from './../components/MovieComments';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export default function MovieDetails() {
    const selectLanguage = state => state.language;
    const getLanguage = createSelector(
        selectLanguage,
        language => language
    )
    const language = useSelector(getLanguage);

    const { id, title } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [movieCredits, setMovieCredits] = useState([]);


    useEffect(() => {
        getMovieCredits(id, language.language).then(result => {
            setMovieCredits(result)
            setIsLoading(false)
        })
    }, [title, id, language])
    return (
        <>
            <main className='d-flex flex-column'>
                <MovieInfo movieCredits={movieCredits} movieId={id} language={language.language} />
                <MovieTrailer movieId={id} language={language.language} />
                <SimilarMovies movieId={id} language={language.language} />
                <Actors movieCredits={movieCredits} />
                <MovieTeam movieCredits={movieCredits} />
                <MovieComments />
            </main >
            <Loading isLoading={isLoading} />
        </>
    )
}
