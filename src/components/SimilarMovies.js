import { similarMoviesURL, posterURL } from "../utils/allApiUrlsHelper"
import { rateColorHelper } from "../utils/rateColorHelper";
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Tooltip, Progress } from 'antd';
import { voteAverageSortHelper } from "../utils/sortHelper";

export default function SimilarMovies({ movieId, scrollPosition, setScrollPosition }) {

    const [data, setData] = useState([])
    const getSimilarMovies = async () => {
        const response = await fetch(similarMoviesURL(movieId))
        const similarMovie = await response.json()
        setData(similarMovie.results)
    }
    useEffect(() => {
        getSimilarMovies()

    }, [movieId])



    return (
        <>
            <h3 className="text-center text-uppercase my-5">Simiar Movies</h3>
            <div className="container d-flex align-items-center justify-content-center flex-wrap">

                {
                    data ? data.slice(0, 4).sort((a, b) => b.vote_average - a.vote_average ).map((movie, index) => (
                        <NavLink onClick={() => setScrollPosition(0)} key={movie.id} to={`/movie/${movie.id}/${movie.title.replace(/\s/g, '')}`} className="movie-card m-3 position-relative" >
                            <Tooltip placement='right' title={movie.overview}>
                                <img className='position-absolute w-100 h-100' src={posterURL() + movie.poster_path} alt={movie.original_title} />
                            </Tooltip>
                            <Progress
                                className='mt-2 bg-white'
                                width={70}
                                strokeColor={movie.vote_average && rateColorHelper(movie.vote_average)}
                                type="circle" percent={movie.vote_average * 10}
                                format={() => movie.vote_average ? movie.vote_average.toFixed(1) : ""}
                            />
                        </NavLink>
                    )) : ""
                }
            </div>
        </>
    )
}
