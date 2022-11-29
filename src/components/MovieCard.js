import { NavLink } from 'react-router-dom';
import { posterURL } from './../utils/allApiUrlsHelper';
import { Tooltip, Progress, Empty } from 'antd';
import { rateColorHelper } from './../utils/rateColorHelper';

export default function MovieCard({ data }) {
    return (
        <>
            {
                data ? data.sort((a, b) => b.vote_average - a.vote_average).map((movie, index) => (
                    <NavLink key={movie.id} to={`/movie/${movie.id}/${movie.title.replace(/\s/g, '')}`} className="movie-card m-3 position-relative rounded-3 overflow-hidden" >
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
                )) : <Empty />
            }
        </>


    )
}
