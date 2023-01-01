import { useState, useEffect, memo } from 'react'
import { useParams } from 'react-router-dom';
import { getPersonOtherMovies } from '../services/tmdb/tmdb';
import MovieCard from "./MovieCard";
import { Empty } from 'antd';


export default memo(function PersonOtherMovies({ personId, language }) {
    const [otherMovies, setOtherMovies] = useState([])
    let { personName } = useParams()

    useEffect(() => {
        getPersonOtherMovies(personId, language).then(result => setOtherMovies(result))
        document.title = `${personName.replace(/([A-Z])/g, ' $1').trim()}` 
    }, [])

    return (
        <div className='container row my-5 mx-auto p-0 g-0 d-flex align-items-center justify-content-center flex-column px-2 rounded-3' >
            <h4 className='webkitHeader-h4 w-100 text-center text-uppercase'>{`${personName.replace(/([A-Z])/g, ' $1').trim()}`}-Yer aldıgı Filmler</h4>
            <div className='d-flex flex-wrap align-items-center justify-content-center'>
                {
                    otherMovies ? <MovieCard movieList={otherMovies} /> : <Empty />
                }
            </div>
        </div>
    )
})
