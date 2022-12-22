import React, { useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getPersonOtherMovies } from '../services/tmdb/tmdb';
import MovieCard from "./MovieCard";
import { Empty } from 'antd';

export default function PersonOtherMovies({ personId, language }) {
    const [otherMovies, setOtherMovies] = useState([])
    let { personName } = useParams()


    const updateGetPersonDetails = useCallback(async () => {
        const response = await getPersonOtherMovies(personId, language)
        setOtherMovies(response)
    }, [personId, language])

    useEffect(() => {
        updateGetPersonDetails()
        document.title = `${personName.replace(/([A-Z])/g, ' $1').trim()}`
    }, [updateGetPersonDetails])

    return (
        <div className='container row my-5 mx-auto p-0 g-0 d-flex align-items-center justify-content-center flex-column px-2 rounded-3' >
            <h4 className='webkitHeader-h4 w-100 text-center text-uppercase'>{`${personName.replace(/([A-Z])/g, ' $1').trim()}`}-Yer aldıgı Filmler</h4>
            <div className='d-flex flex-wrap align-items-center justify-content-center'>
                {
                    otherMovies ? otherMovies.sort((a, b) => b.vote_average - a.vote_average).map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    )) : <Empty />
                }
            </div>
        </div>
    )
}
