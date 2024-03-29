/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { updatePhoto, updateUserName } from "../../services/firebase/firebase";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const UpdateProfileModal = () => {

    const selectUser = state => state.auth.user;
    const selectUserDisplayName = state => state.profile.value.displayName

    const getUserDisplayName = createSelector(
        selectUserDisplayName,
        userDisplayName => userDisplayName
    )
    const getUser = createSelector(
        selectUser,
        user => user
    )
    const user = useSelector(getUser);
    const userDisplayName = useSelector(getUserDisplayName);



    const { t } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayNameInputValue, setDisplayNameInputValue] = useState("")
    const [photoUrlFileValue, setPhotoUrlFileValue] = useState(null)
    const [photoContentType, setPhotoContentType] = useState("")

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        try {
            if (displayNameInputValue.length > 0) {
                updateUserName(displayNameInputValue, user)
            }
            if (photoUrlFileValue !== null) {
                updatePhoto(photoUrlFileValue, user, photoContentType)
            }
            setIsModalOpen(false)
            toast.success(t("YourProfileHasBeenUpdated."))
        } catch (error) {
            toast.error(error.message)
        }


    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleImage = async (e) => {
        const image = e.target.files[0]
        setPhotoUrlFileValue(image);
        setPhotoContentType(image.type)
    }

    return (
        <>
            <button className='cursor-pointer me-2  btn btn-success btn-sm' onClick={showModal} >
                {t("updateProfile")}
            </button>
            <Modal cancelText={t("cancel")} okText={t("update")} title={t("updateProfile")} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <form>
                    <label htmlFor="fullName">{t("nameSurname")}</label>
                    <Input onChange={(e) => setDisplayNameInputValue(e.target.value)} value={displayNameInputValue} id="fullName" placeholder={userDisplayName} />
                    <Input onChange={(e) => handleImage(e)} className='border-0 p-0 mt-2 ' type='file' />
                </form>
            </Modal>
        </>
    );
};
export default UpdateProfileModal;