import { useEffect, useState } from 'react';
import { getMovieCredits } from '../services/tmdb/tmdb';
import { useParams } from 'react-router-dom';
import Actors from '../components/Actors';
import MovieTeam from '../components/MovieTeam';
import MovieTrailer from '../components/MovieTrailer';
import SimilarMovies from '../components/SimilarMovies';
import Loading from '../components/Loading';
import MovieInfo from './../components/MovieInfo';
import MovieComments from './../components/MovieComments';
import useRedux from "../hooks/useRedux"
// import "../css/movie-details.css";


export default function MovieDetails() {
    const { id, title } = useParams();
    const { language } = useRedux()
    // STATES
    const [isLoading, setIsLoading] = useState(true)
    const [movieCredits, setMovieCredits] = useState([]);
    // VARIABLES

    useEffect(() => {
        getMovieCredits(id, language).then(result => {
            setMovieCredits(result)
            setIsLoading(false)
        })
        document.title = `${title.replace(/([A-Z])/g, ' $1').trim()}`
    }, [title, id, language])
    return (
        <>
            <main className='d-flex flex-column'>
                <MovieInfo movieCredits={movieCredits} movieId={id} language={language} />
                <MovieTrailer movieId={id} language={language} />
                <SimilarMovies movieId={id} language={language} />
                <Actors movieCredits={movieCredits} />
                <MovieTeam movieCredits={movieCredits} />
                <MovieComments />
            </main >
            <Loading isLoading={isLoading} />
        </>
    )
}
