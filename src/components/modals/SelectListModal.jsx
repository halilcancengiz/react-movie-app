import React, { useState, memo, useEffect } from 'react';
import { getLists, addMovieToList } from './../../services/firebase/firebase';
import CreateMovieListModal from './CreateMovieListModal';
import { toast } from 'react-hot-toast';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import "../../css/selectListModal.css"

const SelectListModal = ({ movie }) => {
    const { t } = useTranslation()

    const selectUser = state => state.auth.user;
    const selectUserLists = state => state.uLists.value
    const getUserLists = createSelector(
        selectUserLists,
        userLists => userLists
    )
    const getUser = createSelector(
        selectUser,
        user => user
    )

    const userLists = useSelector(getUserLists);
    const user = useSelector(getUser);



    const [listId, setListId] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleChange = (e) => {
        setListId(e.target.value)
    };

    const handleOk = async () => {
        const selectedList = userLists.filter(list => list.id === listId)[0];
        if (selectedList && selectedList.listData.movies.some(y => y.data.id === movie.id)) {
            toast.error(t("The film is available on the list"))
        } else {
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
                {t("addToList")}
            </div>
            <Modal okText={t("addToList")} cancelText={t("cancel")} title={t("ChooseAList")} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <CreateMovieListModal />
                {
                    userLists && userLists.length <= 0 ? <p>{t("You Don't Have A List Yet")}</p> : (
                        <select onChange={handleChange} className='w-100 p-2 mt-3 rounded-3'>
                            <option value="" hidden>{t("ChooseAList")}</option>
                            {
                                userLists ? userLists.map(list => (
                                    <option key={list.id} className='py-2' value={list.id}>{list.listData.list_name}</option>
                                )) : <option value="null">{t("You Don't Have A List Yet")}</option>
                            }
                        </select>
                    )
                }
            </Modal>
        </>
    );
};
export default memo(SelectListModal);