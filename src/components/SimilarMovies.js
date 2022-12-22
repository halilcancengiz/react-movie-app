import { useState, useCallback, useEffect } from 'react';
import { getSimilarMovies } from '../services/tmdb/tmdb';
import MovieCard from './MovieCard';

export default function SimilarMovies({ movieId, language }) {
    const [similarMovies, setSimilarMovies] = useState([])

    const updateGetSimilarMovies = useCallback(async () => {
        getSimilarMovies(movieId, language).then(result => setSimilarMovies(result))
    }, [movieId, language])

    useEffect(() => {
        updateGetSimilarMovies()
    }, [updateGetSimilarMovies])
    return (
        <>
            <h4 className="text-center text-uppercase my-5 webkitHeader-h4 fw-bold">Benzer Filmler</h4>
            <div className="container d-flex align-items-center justify-content-center flex-wrap">

                {
                    similarMovies ? similarMovies.slice(0, 4).sort((a, b) => b.vote_average - a.vote_average).map((movie, index) => (
                        <MovieCard key={movie.id} movie={movie} />
                    )) : ""
                }
            </div>
        </>
    )
}
