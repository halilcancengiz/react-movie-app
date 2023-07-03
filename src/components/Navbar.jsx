import { useEffect, useCallback, memo } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { changeTrLanguage, changeEnLanguage } from "../features/lang"
import { NavLink } from "react-router-dom"
import defaultUserImage from "../assets/images/defaultManImage.png"
import logo from "../assets/images/logo.png"
import { useTranslation } from 'react-i18next';
import i18n from "../i18n";
import { createSelector } from '@reduxjs/toolkit';
import "../css/navbar.css"

function Navbar() {
    const selectUserPhotoURL = state => state.profile.value.photoURL;
    const selectUser = state => state.auth.user;
    const selectLanguage = state => state.language;
    const selectUserDisplayName = state => state.profile.value.displayName;

    const getUserPhotoURL = createSelector(
        selectUserPhotoURL,
        userPhotoURL => userPhotoURL
    )
    const getUserDisplayName = createSelector(
        selectUserDisplayName,
        userDisplayName => userDisplayName
    )
    const getLanguage = createSelector(
        selectLanguage,
        language => language
    )
    const getUser = createSelector(
        selectUser,
        user => user
    )
    const language = useSelector(getLanguage);
    const user = useSelector(getUser);
    const userPhotoURL = useSelector(getUserPhotoURL);
    const userDisplayName = useSelector(getUserDisplayName);

    const dispatch = useDispatch()
    const { t } = useTranslation();

    const toggleLanguage = useCallback(() => {

        if (language.language === "en-EN") {
            dispatch(changeTrLanguage())
        } else {
            dispatch(changeEnLanguage())
        }


    }, [language, dispatch]);

    useEffect(() => {
        i18n.changeLanguage(language.language);
    }, [language])

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
                    <ul className="navbar-nav text-center flex gap-3">
                        <li className="nav-item my-auto d-flex align-items-center justify-content-center ">
                            <button onClick={toggleLanguage} className={language.language === "tr-TR" ? "activeLang" : "deActiveLang"}>TR</button>
                            <button onClick={toggleLanguage} className={language.language === "en-EN" ? "activeLang" : "deActiveLang"}>EN</button>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/popular-movies/" aria-current="page">{t("popularMovies")}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/top-rated-movies/">{t("topRatedMovies")}</NavLink>
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
                                        <NavLink className="nav-link text-capitalize" to="/login">{t("membership")}</NavLink>
                                    </li>
                                )
                        }
                    </ul>
                </div>
            </div >
        </nav >
    )
}

export default memo(Navbar)






