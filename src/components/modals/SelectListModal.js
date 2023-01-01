/* eslint-disable react-hooks/exhaustive-deps */
import { useState, memo, useEffect } from 'react';
import { getLists } from './../../services/firebase/firebase';
import { addMovieToList } from '../../services/firebase/firebase';
import CreateMovieListModal from './CreateMovieListModal';
import { toast } from 'react-hot-toast';
import { Modal } from 'antd';
import "../../css/selectListModal.css"
import useRedux from "../../hooks/useRedux"

const SelectListModal = ({ movie, user }) => {
    const { userLists } = useRedux()
    const [listId, setListId] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleChange = (e) => {
        setListId(e.target.value)
    };

    const handleOk = async () => {
        if (userLists.some(x => x.id === listId && x.listData.movies.some(y => y.data.id === movie.id))) {
            toast.error("Film Listede Mevcut!")
        }
        else {
            addMovieToList(listId, movie)
        }
        setIsModalOpen(false)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        getLists(user)
    }, [user])
    return (
        <>
            <div className='position-absolute add-movie-to-list text-capitalize border-0 text-white py-1 px-2' onClick={showModal}>
                Listeye Ekle
            </div>
            <Modal okText="Listeye ekle" cancelText="İptal" title="Liste Seçin" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <CreateMovieListModal />
                {
                    userLists && userLists.length <= 0 ? <p>Hiç Listeniz Yok</p> : (
                        <select onChange={handleChange} className='w-100 p-2 mt-3 rounded-3'>
                            <option value="" hidden>Bir Liste seçin</option>
                            {
                                userLists ? userLists.map(list => (
                                    <option key={list.id} className='py-2' value={list.id}>{list.listData.list_name}</option>
                                )) : <option value="null">Hiç Listeniz Yok</option>
                            }
                        </select>
                    )
                }
            </Modal>
        </>
    );
};
export default memo(SelectListModal);