import { memo } from "react"
import { NavLink } from 'react-router-dom';
import { deleteMovieToList } from '../services/firebase/firebase';
import { posterURL } from './../services/apiURLs';
import SelectListModal from './modals/SelectListModal';
import { rateColorHelper } from './../utils/rateColorHelper';
import { Tooltip, Progress, Popconfirm } from 'antd';
import { BsTrash } from "../assets/icons/icons"
import { useTranslation } from 'react-i18next';
import useRedux from "../hooks/useRedux"
import ".././css/movieCard.css"

const MovieCard = memo(({ movieList, size, listId }) => {
    const { t } = useTranslation()
    const { user, language } = useRedux()
    return (
        <>
            {
                movieList && !listId ? movieList.map((movie) => (
                    <div key={movie.id} style={{ width: `${size ? size + "px" : "240px"}`, height: `${size ? (size * 1.25) + "px" : "300px"}` }} className={!movie.poster_path || !movie.overview ? "d-none" : "movie-card  m-3 position-relative rounded-3 overflow-hidden"}>
                        <NavLink to={`/movie/${movie.id}/${movie.title.replace(/\s/g, '')}`}>
                            {
                                movie.overview && (
                                    <Tooltip placement='right' title={movie.overview}>
                                        <img className='position-absolute w-100 h-100' src={posterURL(movie.poster_path)} alt={movie.original_title} />
                                    </Tooltip>
                                )
                            }
                            {
                                !size && movie.vote_average && (
                                    <Progress
                                        className='mt-2 bg-white bg-transparent'
                                        width={70}
                                        strokeColor={rateColorHelper(movie.vote_average)}
                                        type="circle" percent={movie.vote_average * 10}
                                        format={() => movie.vote_average.toFixed(1)}
                                    />
                                )
                            }
                        </NavLink>
                        {
                            user && !size && !listId && (
                                <SelectListModal movie={movie} />
                            )
                        }
                    </div>
                )) : movieList && listId ? movieList.map((movie) => (
                    <div key={movie.data.id} style={{ width: `${size ? size + "px" : "280px"}`, height: `${size ? (size * 1.25) + "px" : "350px"}` }} className="movie-card  m-3 position-relative rounded-3 overflow-hidden">
                        <div className="d-flex flex-row align-items-center">
                            <NavLink to={`/movie/${movie.data.id}/${movie.data.title.replace(/\s/g, '')}`}>
                                {
                                    movie.data.overview && (
                                        <Tooltip placement='right' title={movie.data.overview}>
                                            <img className='position-absolute w-100 h-100' src={posterURL(movie.data.poster_path)} alt={movie.data.original_title} />
                                        </Tooltip>
                                    )
                                }
                            </NavLink>
                            <div className='deleteMovieBtn text-center d-flex align-items-center'>
                                <Popconfirm
                                    title={`${language === "en-EN" ? `Are you sure you want to remove the ${movie.data.original_title}?` : `${movie.data.original_title}'ı kaldırmak istediğinize emin misinz?`}`}
                                    onConfirm={() => deleteMovieToList(movie, listId)}
                                    okText={t("yes")}
                                    cancelText={t("no")}>
                                    <BsTrash style={{ cursor: "pointer" }} className='text-white w-100' size={15} />
                                </Popconfirm>
                            </div>
                        </div>

                    </div>
                )) : ""
            }
        </>

    );
});

export default MovieCard



