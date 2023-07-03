import { useState, useEffect, memo } from 'react'
import React from 'react';
import { useParams } from 'react-router-dom';
import { getPersonOtherMovies } from '../services/tmdb/tmdb';
import MovieCard from "./MovieCard";
import { Empty } from 'antd';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';


export default memo(function PersonOtherMovies({ personId, language }) {
    const { t } = useTranslation()
    const [otherMovies, setOtherMovies] = useState([])
    let { personName } = useParams()

    useEffect(() => {
        getPersonOtherMovies(personId, language).then(result => setOtherMovies(result))
    }, [])

    return (
        <div className='container row my-5 mx-auto p-0 g-0 d-flex align-items-center justify-content-center flex-column px-2 rounded-3' >
            <Helmet>
                <title>{`${personName.replace(/([A-Z])/g, ' $1').trim()}`}</title>
            </Helmet>

            <h4 className='webkitHeader-h4 w-100 text-center text-uppercase'>{`${personName.replace(/([A-Z])/g, ' $1').trim()}-${t("moviesFeaturing")}`}</h4>
            <div className='d-flex flex-wrap align-items-center justify-content-center'>
                {
                    otherMovies ? <MovieCard movieList={otherMovies} /> : <Empty />
                }
            </div>
        </div>
    )
})
