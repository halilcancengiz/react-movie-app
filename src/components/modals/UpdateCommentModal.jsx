import React, { useState, memo } from 'react';
import { FiEdit } from "../../assets/icons/icons"
import { Collapse, Modal } from 'antd';
import { updateComment, deleteComment } from "../../services/firebase/firebase";
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const UpdateCommentModal = memo(({ data, id }) => {
    const { t } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateCommentDescription, setUpdateCommentDescription] = useState(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (updateCommentDescription === null) {
            toast.error("Please do not leave the comment field blank!");
        } else {
            deleteComment(id);
            setIsModalOpen(false);
            updateComment(data, updateCommentDescription);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <FiEdit
                color="#0A253E"
                size={20}
                className="cursor-pointer"
                onClick={showModal}
            />
            <Modal
                cancelText={t("cancel")}
                okText={t("send")}
                title={"currentComment"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Collapse>
                    <textarea
                        onChange={(e) => setUpdateCommentDescription(e.target.value)}
                        maxLength={150}
                        placeholder={t("Please write your comment...")}
                        className="comment-area w-100"
                        id=""
                        cols="30"
                        rows="10"
                    ></textarea>
                </Collapse>
            </Modal>
        </>
    );
});

export default UpdateCommentModal;