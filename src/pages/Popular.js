/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination';
import "../css/popular.css"
import { useSearchParams } from 'react-router-dom';
import { popularMoviesAPIURL} from '../utils/allApiUrlsHelper';
import MovieCard from './../components/MovieCard';


export default function Popular() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get("page") || 1;
    const [popularMovies, setPopularMovies] = useState([])

    const getData = async () => {
        const response = await fetch(popularMoviesAPIURL(page))
        const json = await response.json()
        const data = json.results
        setPopularMovies(data)
    }
    useEffect(() => {
        getData()
    }, [page])
    return (
        <main className='container mt-5 d-flex flex-column'>
            <h4 className='m-0 p-0 text-center py-2 rounded-pill text-uppercase fw-bold'>Popüler Filmler</h4>

            <div className="container d-flex align-items-center justify-content-center flex-wrap">
                <MovieCard data={popularMovies} />
            </div>
            <Pagination page={page} setSearchParams={setSearchParams} />
        </main>
    )
}
