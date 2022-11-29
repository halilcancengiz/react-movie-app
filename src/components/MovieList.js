/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import Jumbotron from './Jumbotron';

import { movieSearchURL, posterURL } from '../utils/allApiUrlsHelper';
import { rateColorHelper } from '../utils/rateColorHelper';

import { NavLink, useParams } from 'react-router-dom';
import { Tooltip, Progress, Empty } from 'antd';

import "../css/movielist.css"
import MovieCard from './MovieCard';

export default function MovieList() {
    const [data, setData] = useState([])
    const params = useParams()
    const searchMovie = async () => {
        const response = await fetch(movieSearchURL(params))
        const json = await response.json()
        setData(json.results)
    }

    useEffect(() => {
        searchMovie()
        console.log(data);

    }, [params])
    return (
        <div style={{ minHeight: "100vh" }}>
            <Jumbotron />
            <div className="container d-flex  align-items-center justify-content-center flex-wrap mx-auto">
                <MovieCard data={data} />
            </div>
        </div>

    )
}
