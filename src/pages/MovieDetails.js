import { useEffect, useState, useCallback } from 'react';
import { getMovieCredits } from '../services/tmdb/tmdb';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Actors from '../components/Actors';
import MovieTeam from '../components/MovieTeam';
import MovieTrailer from '../components/MovieTrailer';
import SimilarMovies from '../components/SimilarMovies';
import Loading from '../components/Loading';
import MovieInfo from './../components/MovieInfo';
import MovieComments from './../components/MovieComments';

import "../css/movie-details.css";



export default function MovieDetails() {
    const { id, title } = useParams();
    const movieId = id;

    const language = useSelector((state) => state.language.language)
    // STATES
    const [isLoading, setIsLoading] = useState(true)
    const [movieCredits, setMovieCredits] = useState([]);
    // VARIABLES

    const updateMovieCredits = useCallback(async () => {
        getMovieCredits(movieId, language).then(result => setMovieCredits(result))
    }, [movieId, language])

    // const findRandomMovie = () => {
    //     window.location.assign(`/movie/${Math.floor(Math.random() * 300)}/GuillermodelTorosunar:Pinokyo`);
    // }

    useEffect(() => {
        updateMovieCredits()
        document.title = `${title.replace(/([A-Z])/g, ' $1').trim()}`
        setTimeout(() => {
            setIsLoading(false)
        }, 1500);
    }, [updateMovieCredits, title])
    return (

        <>
            <main className='d-flex flex-column'>
                <MovieInfo movieCredits={movieCredits} movieId={movieId} language={language} />
                <div className='container row my-5 mx-auto p-0 g-0 d-flex align-items-center justify-content-center flex-column px-2 rounded-3'>
                    <MovieTrailer movieId={movieId} language={language} />
                    <SimilarMovies movieId={movieId} language={language} />
                    <Actors movieCredits={movieCredits} />
                    <MovieTeam movieCredits={movieCredits} />
                    <MovieComments />
                </div>
            </main >
            <Loading isLoading={isLoading} />
            {/* <button onClick={findRandomMovie} style={{ right: "0", bottom: "50px" }} className='bg-danger rounded-pill p-2 position-fixed text-white border-0'>Değiştir</button> */}
        </>


    )
}
