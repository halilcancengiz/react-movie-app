import { useState } from 'react'
import { Popconfirm, Empty, Collapse } from 'antd';
import { BsTrash, FaArrowRight, FaArrowDown } from "../assets/icons/icons"
import { deleteList } from '../services/firebase/firebase';
import { toast } from 'react-hot-toast';
import MovieCard from './MovieCard';
import "../css/movielist.css"


export default function MovieList({ list }) {
    const [showMovies, setShowMovies] = useState(false)
    const handleDelete = async (id) => {
        deleteList(id)
        toast.success("Liste Başarıyla Silindi...")
    }

    return (
        <Collapse className='my-2 text-white rounded-4 overflow-hidden'>
            <div onClick={() => setShowMovies(!showMovies)} className='movie-list-container d-flex align-items-center justify-content-between p-3 '>
                <div className='d-flex align-items-center'>
                    {
                        !showMovies ? <FaArrowRight /> : <FaArrowDown />
                    }
                    <span className='ms-3 text-capitalize'>{list.data.list_name}</span>
                </div>
                <Popconfirm
                    title={`${list.data.list_name} listesini silmek istediğinize emin misiniz?`}
                    onConfirm={() => handleDelete(list.id)}
                    okText="Evet"
                    cancelText="Hayır"
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
                                list.data.movies.length > 0 ? list.data.movies.map((movie, index) => (
                                    <div key={index} className="d-flex flex-column align-items-center position-relative justify-content-center rounded-3 mx-2 ">
                                        <MovieCard listId={list.id} size={150} movie={movie.data} deleteMovie={movie} />
                                    </div>
                                )) : <Empty description="Henüz hiç film yok!" />
                            }
                        </div>

                    </div>
                ) : ""
            }

        </Collapse>
    )
}
