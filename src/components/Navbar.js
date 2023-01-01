import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from "react-redux"
import { changeTrLanguage, changeEnLanguage } from "../features/lang"
import { getUserImageFromFirebase } from '../services/firebase/firebase';
import { NavLink } from "react-router-dom"
import defaultUserImage from "../assets/images/defaultManImage.png"
import logo from "../assets/images/logo.png"
import "../css/navbar.css"
import UseRedux from "../hooks/useRedux"

function Navbar() {
    const { user, language, userPhotoURL, userDisplayName } = UseRedux()
    const dispatch = useDispatch()

    const toggleLanguage = useCallback(() => {
        if (language === "en-EN") {
            dispatch(changeTrLanguage())
        } else {
            dispatch(changeEnLanguage())
        }
    }, [language, dispatch]);


    useEffect(() => {

    }, [user])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container d-flex align-items-center justify-content-between">
                <NavLink className="navbar-brand" to="/">
                    <img className='img-fluid' id="logo" src={logo} alt="api-logo" />
                </NavLink>
                <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav text-center">
                        <li className="nav-item my-auto d-flex align-items-center justify-content-center">
                            <button onClick={toggleLanguage} className={language === "tr-TR" ? "activeLang" : "deActiveLang"}>TR</button>
                            <button onClick={toggleLanguage} className={language === "en-EN" ? "activeLang" : "deActiveLang"}>EN</button>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/popular-movies/?page=1" aria-current="page">Popüler Filmler</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/top-rated-movies/?page=1">En Çok Oylananlar</NavLink>
                        </li>
                        {
                            user ? (
                                <li className="d-flex align-items-center justify-content-center">
                                    <NavLink to={`/profile/${userDisplayName ? userDisplayName.toLowerCase().split(" ").join("") : user.displayName ? user.displayName.toLowerCase().split(" ").join("") : `Yeni Kullanıcı${Math.floor(Math.random() * 10000000)}`}`} className="user-avatar rounded-circle overflow-hidden">
                                        {
                                            <img className="w-100 h-100" src={userPhotoURL ? userPhotoURL : defaultUserImage} alt="user-avatar" />
                                        }
                                    </NavLink>
                                </li>

                            ) :
                                (
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Membership</NavLink>
                                    </li>
                                )
                        }
                    </ul>
                </div>
            </div >
        </nav >
    )
}

export default Navbar