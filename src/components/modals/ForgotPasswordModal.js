import { useState } from 'react';
import { Modal, Input } from 'antd';
import { resetPassword } from "../../services/firebase/firebase";
import { useTranslation } from 'react-i18next';
import "../../css/forgot-password-modal.css"


const ForgotPasswordModal = () => {
    const { t } = useTranslation()
    const [email, setEmail] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        const response = await resetPassword(email)
        if (response === true) {
            setIsModalOpen(false);
            setEmail("")
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div onClick={showModal}>
                {t("ForgotPassword?")}
            </div>
            <Modal okText={t("send")} title={"resetPassword"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder={t("Please Enter Your Email")} onChange={(e) => setEmail(e.target.value)} defaultValue={email} />
            </Modal>
        </>
    );
};
export default ForgotPasswordModal;