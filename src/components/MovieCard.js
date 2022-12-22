import { NavLink } from 'react-router-dom';
import { posterURL } from './../services/apiURLs';
import { Tooltip, Progress, Empty, Popconfirm } from 'antd';
import { rateColorHelper } from './../utils/rateColorHelper';
import SelectListModal from './modals/SelectListModal';
import { useSelector } from 'react-redux';
import { deleteMovieToList } from '../services/firebase/firebase';
import { BsTrash } from "../assets/icons/icons"
import ".././css/movieCard.css"





export default function MovieCard({ movie, deleteMovie, size, listId }) {
    const user = useSelector(state => state.auth.user)
    
    const handleDeleteMovie = async () => {
        await deleteMovieToList(deleteMovie, listId)
    }
    return (
        <>
            <div style={{ width: `${size ? size + "px" : "280px"}`, height: `${size ? (size * 1.25) + "px" : "350px"}` }} className={movie.poster_path && movie.vote_average && movie.overview ? "movie-card m-3 position-relative rounded-3 overflow-hidden" : "d-none"}>
                <NavLink to={`/movie/${movie.id}/${movie.title.replace(/\s/g, '')}`}>
                    <Tooltip placement='right' title={movie.overview}>
                        <img className='position-absolute w-100 h-100' src={posterURL(movie.poster_path) } alt={movie.original_title} />
                    </Tooltip>
                    {
                        size ? "" : <Progress
                            className='mt-2 bg-white bg-transparent'
                            width={70}
                            strokeColor={movie.vote_average && rateColorHelper(movie.vote_average)}
                            type="circle" percent={movie.vote_average * 10}
                            format={() => movie.vote_average ? movie.vote_average.toFixed(1) : ""}
                        />
                    }


                </NavLink>
                {
                    listId ? (
                        <div className='deleteMovieBtn text-center d-flex align-items-center'>
                            <Popconfirm
                                title={`${movie.original_title}'ı kaldırmak istediğinize emin misiniz?`}
                                onConfirm={handleDeleteMovie}
                                okText="Evet"
                                cancelText="Hayır">
                                <BsTrash style={{ cursor: "pointer" }} className='text-white w-100' size={15} />
                            </Popconfirm>
                        </div>
                    ) : ""
                }
                {
                    user && !size ? <SelectListModal movie={movie} /> : " "
                }
            </div>
        </>


    )
}
