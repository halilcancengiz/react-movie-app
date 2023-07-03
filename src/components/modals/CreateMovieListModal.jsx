import React,{ useState } from 'react';
import { Modal, Input } from 'antd';
import { toast } from 'react-hot-toast';
import { BsPlusSquareFill } from "react-icons/bs"
import { createList } from '../../services/firebase/firebase';
import { useTranslation } from 'react-i18next';
import "../../css/create-movie-list-modal.css"

const CreateMovieListModal = () => {
    const { t } = useTranslation()
    const [listName, setListName] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        if (listName.length === 0) {
            toast.error(t("List name cannot be left blank."))
        }
        else {
            setIsModalOpen(false)
            setListName("")
            createList(listName)
        }

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <button id='createMovieListModalButton' className='btn btn-sm me-2 d-flex align-items-center justify-content-center text-white' onClick={showModal}>
                <BsPlusSquareFill className='me-2' />
                {t("createAMovieList")}
            </button>
            <Modal cancelText={t("cancel")} okText={t("create")} title={t("createAMovieList")} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <label htmlFor="listname">{t("listName")}</label>
                <Input id='listname' placeholder={t("listName")} onChange={(e) => setListName(e.target.value)} value={listName} />
            </Modal>
        </>
    );
};
export default CreateMovieListModal;