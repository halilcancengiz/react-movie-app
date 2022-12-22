/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { FiEdit } from "../../assets/icons/icons"
import { Collapse } from 'antd';
import { updateComment } from "../../services/firebase/firebase";
import { toast } from 'react-hot-toast';
import { deleteComment } from "../../services/firebase/firebase";




const UpdateCommentModal = ({ data, id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateCommentDescription, setUpdateCommentDescription] = useState(null)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (updateCommentDescription === null) {
            toast.error("Lütfen yorum alanını boş bırakmayın !")
        }
        else {
            deleteComment(id)
            setIsModalOpen(false)
            updateComment(data, updateCommentDescription)
        }

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };




    return (
        <>
            <FiEdit color='#0A253E' size={20} className='cursor-pointer' onClick={showModal} />
            <Modal cancelText="iptal" okText="Gönder" title="Güncel Yorum" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Collapse>
                    <textarea onChange={(e) => setUpdateCommentDescription(e.target.value)} maxLength={150} placeholder="Lütfen yorumunuzu yazın..." className="comment-area w-100" id="" cols="30" rows="10"></textarea>
                </Collapse>
            </Modal>
        </>
    );
};
export default UpdateCommentModal;