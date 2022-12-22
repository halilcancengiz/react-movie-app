/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutHandle } from '../features/auth';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import { firebaseLogout, db } from "../services/firebase/firebase";
import CreateMovieListModal from "../components/modals/CreateMovieListModal"
import UpdateProfileModal from './../components/modals/UpdateProfileModal';
import MovieList from './../components/MovieList';
import UserInfo from '../components/UserInfo';
import "../css/profile.css"

export default function Profile() {
    const [lists, setLists] = useState([])
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()

    const handleLogout = () => {
        firebaseLogout()
        dispatch(logoutHandle())
        navigate("/login")
    }

    const getLists = () => {
        return onSnapshot(query(collection(db, "lists"), where("createdWho", "==", user.uid)), (result) => {
            const x = []
            result.forEach(doc => {
                x.push({ id: doc.id, data: doc.data() })
            })
            setLists(x)
        });
    }

    useEffect(() => {
        if (user && user.uid) {
            getLists()
        }
    }, [user])


    return (
        <div style={{ minHeight: "100vh" }} className="container mx-auto my-5">
            <div className='d-flex justify-content-center'>
                <h4 className='webkitHeader-h4 text-uppercase fw-bold text-center'>PROFILIM</h4>
            </div>
            <div className='d-flex align-items-center justify-content-start mb-5'>
                <div className='d-flex align-items-center justify-content-center'>
                    <UpdateProfileModal />
                </div>
                <div className='d-flex align-items-center justify-content-center'>
                    <CreateMovieListModal />
                </div>
                <div className='d-flex align-items-center justify-content-center'>
                    <button className='btn btn-danger btn-sm' onClick={handleLogout}>Çıkış Yap</button>
                </div>
            </div>
            <UserInfo lists={lists} />

            {/* SECOND AREA START */}
            <div className='w-100 d-flex justify-content-center'>
                <h4 className='webkitHeader-h4 text-uppercase fw-bold text-center'>Listelerim</h4>
            </div>
            {
                lists ? lists.sort((a, b) => new Date(b.data.createdAt) - new Date(a.data.createdAt)).map(list => (
                    <MovieList key={list.id} list={list} />
                )) : ""
            }
            {/* SECOND AREA END */}
        </div>
    )
}
