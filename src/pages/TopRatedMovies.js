import React, { useEffect, useState } from 'react'
import { Progress, Tooltip } from 'antd'
import { NavLink, useSearchParams } from 'react-router-dom';
import { rateColorHelper } from '../utils/rateColorHelper';
import Pagination from '../components/Pagination';
import { posterURL } from '../utils/allApiUrlsHelper';
import MovieCard from '../components/MovieCard';



export default function Trends() {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get("page") || 1;
    const [topRatedMovies, setTopRatedMovies] = useState([])

    useEffect(() => {
        const getTopRatedMovies = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
            const trendMovies = await response.json()
            setTopRatedMovies(trendMovies.results)
        }
        getTopRatedMovies()
    }, [page])
    return (
        <main className='container mt-5 d-flex flex-column'>
            <h4 className='m-0 p-0 text-center py-2 rounded-pill text-uppercase fw-bold'>Top Rated</h4>

            <div className="container d-flex align-items-center justify-content-center flex-wrap">
                <MovieCard data={topRatedMovies} />
            </div>
            <Pagination page={page} setSearchParams={setSearchParams} />
        </main>
    )
}
