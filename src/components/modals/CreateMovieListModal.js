import { useState } from 'react';
import { Modal, Input } from 'antd';
import { toast } from 'react-hot-toast';
import { BsPlusSquareFill } from "react-icons/bs"
import { createList } from '../../services/firebase/firebase';
import "../../css/create-movie-list-modal.css"

const CreateMovieListModal = () => {
    const [listName, setListName] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        if (listName.length === 0) {
            toast.error("Liste ismi boş bırakılamaz!")
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
                Bir Film Listesi Oluştur
            </button>
            <Modal okText="Create a Movie List" title="Create a Movie List" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <label htmlFor="listname">List Name :</label>
                <Input id='listname' placeholder='List Name' onChange={(e) => setListName(e.target.value)} value={listName} />
            </Modal>
        </>
    );
};
export default CreateMovieListModal;