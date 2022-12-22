/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Modal } from 'antd';
import { toast } from 'react-hot-toast';
import { Input } from 'antd';
import { useSelector } from 'react-redux';
import { updateUserNameAndUserPhoto } from "../../services/firebase/firebase";
import { convertBase64 } from './../../utils/base64Helper';

const UpdateProfileModal = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayNameInputValue, setDisplayNameInputValue] = useState("")
    const [photoUrlFileValue, setPhotoUrlFileValue] = useState(null)
    const user = useSelector(state => state.auth.user)
    const displayName = useSelector(state => state.profile.value.displayName)
    const photoURL = useSelector(state => state.profile.value.photoURL)


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (displayNameInputValue.length <= 0 && photoUrlFileValue === null) {
            toast.error("Lütfen güncellemek istediğiniz alanları boş bırakmayın!")
        }
        else if (displayNameInputValue.length <= 0 && photoUrlFileValue !== null) {
            updateUserNameAndUserPhoto(displayName, photoUrlFileValue, user)
            setIsModalOpen(false)
            setDisplayNameInputValue("")
        }
        else if (displayNameInputValue.length <= 0 && photoUrlFileValue === null) {
            updateUserNameAndUserPhoto(displayNameInputValue, photoURL, user)
            setIsModalOpen(false)
            setDisplayNameInputValue("")
        }
        else {
            updateUserNameAndUserPhoto(displayNameInputValue, photoUrlFileValue, user)
            setIsModalOpen(false)
            setDisplayNameInputValue("")
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleImage = async (e) => {
        const image = e.target.files[0]
        const base64Image = await convertBase64(image)
        setPhotoUrlFileValue(base64Image);
    }

    return (
        <>
            <button className='cursor-pointer me-2 btn btn-success btn-sm' onClick={showModal} >
                Güncelle
            </button>
            <Modal cancelText="iptal" okText="Güncelle" title="Profilizi Güncelleyin" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <form>
                    <label htmlFor="fullName">Ad, Soyad :</label>
                    <Input onChange={(e) => setDisplayNameInputValue(e.target.value)} value={displayNameInputValue} id="fullName" placeholder={displayName} />
                    <Input onChange={(e) => handleImage(e)} className='border-0 p-0 mt-2 ' type='file' />
                </form>
            </Modal>
        </>
    );
};
export default UpdateProfileModal;