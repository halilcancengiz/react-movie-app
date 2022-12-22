import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import MovieCard from '../components/MovieCard';
import { useSelector } from 'react-redux';
import { getTopRatedMovies } from '../services/tmdb/tmdb';

export default function Trends() {

    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get("page") || 1;
    const language = useSelector((state) => state.language.language)

    const updateGetTopRatedMovies = useCallback(async () => {
        const result = await getTopRatedMovies(page, language)
        setTopRatedMovies(result)
    }, [page, language])

    useEffect(() => {
        updateGetTopRatedMovies()
        document.title = "En Çok Oylanan Filmler"
    }, [updateGetTopRatedMovies])
    return (
        <main className='container mt-5 d-flex flex-column'>
            <div className="mx-auto">
                <h4 className='m-0 p-0 text-center py-2 webkitHeader-h4 text-uppercase fw-bold'>Top Rated</h4>
                <div className='designBorder'></div>
            </div>

            <div className="container d-flex align-items-center justify-content-center flex-wrap">
                {
                    topRatedMovies ? topRatedMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    )) : ""
                }
            </div>
            <Pagination page={page} setSearchParams={setSearchParams} />
        </main>
    )
}
