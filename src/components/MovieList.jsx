import { useState, memo } from 'react'
import { Popconfirm, Empty, Collapse } from 'antd';
import { BsTrash, FaArrowRight, FaArrowDown } from "../assets/icons/icons"
import { deleteList } from '../services/firebase/firebase';
import { toast } from 'react-hot-toast';
import MovieCard from './MovieCard';
import { useTranslation } from 'react-i18next';
import "../css/movielist.css"


export default memo(function MovieList({ list, language }) {
    const { t } = useTranslation()
    const [showMovies, setShowMovies] = useState(false)
    const handleDelete = async (id) => {
        deleteList(id)
        toast.success(t("TheListHasBeenDeletedSuccessfully."))
    }

    return (
        <Collapse className='my-4 text-white rounded-4 overflow-hidden'>
            <div onClick={() => setShowMovies(!showMovies)} className='movie-list-container  rounded-4 d-flex align-items-center justify-content-between p-3 '>
                <div className='d-flex align-items-center'>
                    {
                        !showMovies ? <FaArrowRight /> : <FaArrowDown />
                    }
                    <span className='ms-3 text-capitalize'>{list.listData.list_name}</span>
                </div>
                <Popconfirm
                    title={` ${language.language === "en-EN" ? `Are you sure you want to delete the "${list.listData.list_name}" list?` : `"${list.listData.list_name}" listesini silmek istediğinize emin misiniz?`}`}
                    onConfirm={() => handleDelete(list.id)}
                    okText={t("yes")}
                    cancelText={t("no")}
                >
                    <div id='listDeleteButton' className='p-1 d-flex align-items-center justify-content-center'>
                        <BsTrash size={20} className="cursor-pointer" />
                    </div>
                </Popconfirm>
            </div>
            {
                showMovies ? (
                    <div id='moviesInTheList' className='d-flex align-items-center justify-content-center'>
                        <div className='d-flex align-items-start flex-wrap justify-content-center m-0 px-3 py-2 w-100'>
                            {
                                list.listData.movies.length > 0 ? (
                                    <div className="d-flex align-items-center flex-wrap position-relative justify-content-center rounded-3 mx-2 ">
                                        <MovieCard listId={list.id} size={150} movieList={list.listData.movies} />
                                    </div>
                                ) : <Empty description={t("thereAreNoMoviesYet")} />
                            }
                        </div>
                    </div>
                ) : ""
            }

        </Collapse>
    )
})
