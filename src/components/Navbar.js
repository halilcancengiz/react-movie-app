// import { useState, useRef, useEffect } from 'react'
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { changeTrLanguage, changeEnLanguage } from "../features/lang"
import defaultUserImage from "../assets/images/defaultManImage.png"
import logo from "../assets/svg/logo.svg"
import "../css/navbar.css"




export default function Navbar() {
    const [currentLang, setCurrentLang] = useState(false)
    const userPhoto = useSelector((state) => state.profile.value.photoURL)
    const user = useSelector((state) => state.auth.user)
    const language = useSelector((state) => state.language.language)
    const dispatch = useDispatch()

    useEffect(() => {

    }, [language, user])

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container d-flex align-items-center justify-content-between">
                <NavLink className="navbar-brand" to="/">
                    <img id="logo" src={logo} alt="api-logo" />
                </NavLink>
                <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item my-auto d-flex align-items-center justify-content-center">
                            <button onClick={() => dispatch(changeTrLanguage())} className={language === "tr-TR" ? "activeLang" : "deActiveLang"}>TR</button>
                            <button onClick={() => dispatch(changeEnLanguage())} className={language === "en-EN" ? "activeLang" : "deActiveLang"}>EN</button>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/popular-movies/?page=1" aria-current="page">Popüler Filmler</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/top-rated-movies/?page=1">En Çok Oylananlar</NavLink>
                        </li>
                        {
                            user ? (
                                <li className="d-flex align-items-center justify-content-start">
                                    <NavLink to={`/profile/${user.displayName ? user.displayName.toLowerCase().split(" ").join("") : `newUser${Math.floor(Math.random() * 10000000)}`}`} className="user-avatar rounded-circle overflow-hidden">
                                        {
                                            <img className="w-100 h-100" src={userPhoto && userPhoto.length > 0 ? userPhoto : user && user.photoURL !== null ? user.photoURL : defaultUserImage} alt="user-avatar" />
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

