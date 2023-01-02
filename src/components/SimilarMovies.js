import { useState, useCallback, useEffect, memo } from 'react';
import { getSimilarMovies } from '../services/tmdb/tmdb';
import { useTranslation } from 'react-i18next';
import MovieCard from './MovieCard';

export default memo(function SimilarMovies({ movieId, language }) {
    const { t } = useTranslation()
    const [similarMovies, setSimilarMovies] = useState([])

    const updateGetSimilarMovies = useCallback(async () => {
        getSimilarMovies(movieId, language).then(result => setSimilarMovies(result))
    }, [movieId, language])

    useEffect(() => {
        updateGetSimilarMovies()
    }, [updateGetSimilarMovies])
    return (
        <div className="container">
            <h4 className="text-center text-uppercase w-100 my-5 webkitHeader-h4 fw-bold">{t("similarMovies")}</h4>
            <div className="d-flex align-items-center justify-content-center flex-wrap">
                {
                    similarMovies && similarMovies.length > 0 ? (
                        <MovieCard
                            movieList={similarMovies.slice(0, 4).sort((a, b) => b.vote_average - a.vote_average).filter(
                                movie => movie.poster_path && movie.vote_average && movie.overview
                            )}
                        />
                    ) : ""
                }
            </div>
        </div>

    )
})
