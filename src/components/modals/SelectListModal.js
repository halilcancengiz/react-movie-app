/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Modal } from 'antd';
import CreateMovieListModal from './CreateMovieListModal';
import { query, onSnapshot, collection, where } from 'firebase/firestore';
import { db, addMovieToList } from '../../services/firebase/firebase';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import "../../css/selectListModal.css"
import { toast } from 'react-hot-toast';

const SelectListModal = ({ movie }) => {

    const user = useSelector(state => state.auth.user)
    const [lists, setLists] = useState()
    const [listId, setListId] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);

    };
    const handleChange = (e) => {
        setListId(e.target.value)
    };

    const handleOk = async () => {
        if (lists.some(x => x.data.movies.some(y => y.data.id === movie.id))) {
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

    const getLists = async () => {
        return onSnapshot(query(collection(db, "lists"), where("createdWho", "==", user.uid)), (result) => {
            const x = []
            result.forEach(doc => {
                x.push({ id: doc.id, data: doc.data() })
            })
            setLists(x)
        });

    }

    useEffect(() => {
        getLists()
    }, [])
    return (
        <>
            <div className='position-absolute add-movie-to-list text-capitalize border-0 text-white py-1 px-2' onClick={showModal}>
                Listeye Ekle
            </div>
            <Modal okText="Listeye ekle" cancelText="İptal" title="Liste Seçin" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <CreateMovieListModal />
                {
                    lists && lists.length <= 0 ? <p>Hiç Listeniz Yok</p> : (
                        <select onChange={handleChange} className='w-100 p-2 mt-3 rounded-3'>
                            <option value="" hidden>Bir Liste seçin</option>
                            {
                                lists ? lists.map(list => (
                                    <option key={list.id} className='py-2' value={list.id}>{list.data.list_name}</option>
                                )) : <option value="null">Hiç Listeniz Yok</option>
                            }
                        </select>
                    )
                }

            </Modal>
        </>
    );
};
export default SelectListModal;