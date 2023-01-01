import { useState } from 'react';
import { Modal, Input } from 'antd';
import { resetPassword } from "../../services/firebase/firebase";
import "../../css/forgot-password-modal.css"


const ForgotPasswordModal = () => {
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
                Forgot Password?
            </div>
            <Modal okText="Gönder" title="Parola Sıfırlama" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder='Please enter your Email' onChange={(e) => setEmail(e.target.value)} defaultValue={email} />
            </Modal>
        </>
    );
};
export default ForgotPasswordModal;