import { useEffect, useState, useCallback } from 'react';
import { searchMovie } from '../services/tmdb/tmdb';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Jumbotron from './Jumbotron';
import MovieCard from './MovieCard';

export default function MovieList() {
    const [searchMovieList, setSearchMovieList] = useState([])
    const params = useParams()
    const language = useSelector((state) => state.language.language)


    const updateSearchMovie = useCallback(() => {
        searchMovie(params, language).then(result => setSearchMovieList(result))
    }, [params, language])

    useEffect(() => {
        updateSearchMovie()
    }, [updateSearchMovie])
    return (
        <div style={{ minHeight: "100vh" }}>
            <Jumbotron />
            <div className="container d-flex  align-items-center justify-content-center flex-wrap mx-auto">
                {
                    searchMovieList ? searchMovieList.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    )) : ""
                }
            </div>
        </div>

    )
}
