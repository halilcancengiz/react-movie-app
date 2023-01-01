import { useEffect, useState, useCallback } from 'react';
import { searchMovie } from '../services/tmdb/tmdb';
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard';
import useRedux from "../hooks/useRedux"
import SearchBar from './SearchBar';

function SearchList() {
    const [searchMovieList, setSearchMovieList] = useState([])
    const { query } = useParams()
    const { language } = useRedux()


    const updateSearchMovie = useCallback(() => {
        searchMovie(query, language).then(result => setSearchMovieList(result))
    }, [query, language])

    useEffect(() => {
        updateSearchMovie()
    }, [updateSearchMovie])

    return (
        <div style={{ minHeight: "100vh" }}>
            <h4 className='webkitHeader-h4 text-uppercase text-center w-100 my-5'>{`${query}-Arama Sonuçları`}</h4>
            <div className="container d-flex  align-items-center justify-content-center flex-wrap mx-auto">
                {
                    searchMovieList && <MovieCard movieList={searchMovieList} />
                }
            </div>
            <SearchBar />
        </div>

    )
}
export default SearchList