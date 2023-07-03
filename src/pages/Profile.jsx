import React,{ useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutHandle } from '../features/auth';
import { firebaseLogout, getLists } from "../services/firebase/firebase";
import CreateMovieListModal from "../components/modals/CreateMovieListModal"
import UpdateProfileModal from './../components/modals/UpdateProfileModal';
import MovieList from './../components/MovieList';
import UserInfo from '../components/UserInfo';
import useRedux from '../hooks/useRedux';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Empty } from 'antd';
import "../css/profile.css"

function Profile() {
    const { userName } = useParams()
    const dispatch = useDispatch()
    const { user, userLists, language } = useRedux()
    const navigate = useNavigate()
    const sortedLists = [...userLists].sort((a, b) => new Date(b.listData.createdAt) - new Date(a.listData.createdAt))
    const { t } = useTranslation()


    const handleLogout = () => {
        firebaseLogout()
        dispatch(logoutHandle())
        navigate("/login")
    }

    useEffect(() => {
        getLists(user)
    }, [user])


    return (
        <div style={{ minHeight: "100vh" }} className="container mx-auto my-5">
            <Helmet>
                <title>{`Profile-${userName ? userName : t("newUser")}`}</title>
            </Helmet>
            <div className='d-flex justify-content-center'>
                <h4 className='webkitHeader-h4 text-uppercase fw-bold text-center'>{t("myProfile")}</h4>
            </div>
            <div className='d-flex align-items-center justify-content-start mb-5'>
                <div className='d-flex align-items-center justify-content-center'>
                    <UpdateProfileModal />
                </div>
                <div className='d-flex align-items-center justify-content-center'>
                    <CreateMovieListModal />
                </div>
                <div className='d-flex align-items-center justify-content-center'>
                    <button className='btn btn-danger btn-sm' onClick={handleLogout}>{t("exit")}</button>
                </div>
            </div>
            <UserInfo user={user} />

            {/* SECOND AREA START */}
            <div className='w-100 d-flex justify-content-center'>
                <h4 className='webkitHeader-h4 text-uppercase fw-bold text-center'>{t("myLists")}</h4>
            </div>
            {
                sortedLists && sortedLists.length > 0 ? sortedLists.map(list => (
                    <MovieList key={list.id} list={list} language={language} />
                )) : <Empty className='mt-5' description={t("thereAreNoMoviesYet")} />
            }
            {/* SECOND AREA END */}
        </div>
    )
}
export default Profile