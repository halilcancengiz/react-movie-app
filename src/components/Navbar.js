// import { useState, useRef, useEffect } from 'react'
import { NavLink } from "react-router-dom"
import "../css/navbar.css"
import { FaArrowDown, FaUserCircle } from '../assets/icons/icons'
import logo from "../assets/svg/logo.svg"


export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container d-flex align-items-center justify-content-between">
                <NavLink className="navbar-brand" to="/">
                    <img id="logo" style={{ width: "120px", filter: "drop-shadow(1px 1px 2px white)" }} src={logo} alt="api-logo" />
                </NavLink>
                <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/popular-movies/?page=1" aria-current="page">Popüler Filmler</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/top-rated-movies/?page=1">En Çok Oylananlar</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FaUserCircle color="white" className="me-1" size={20} />
                                <FaArrowDown color="white" size={12} />
                            </NavLink>
                            <ul className="dropdown-menu overflow-hidden p-0" aria-labelledby="navbarDropdownMenuLink m-0 p-0">
                                <li><NavLink to="movies-to-watch" className="dropdown-item">İzlenecekler</NavLink></li>
                                <li><NavLink to="watched" className="dropdown-item">İzlediklerim</NavLink></li>
                                <li><NavLink to="my-favorite" className="dropdown-item">Favorilerim</NavLink></li>
                                <li><button to="" className="dropdown-item">Çıkış</button></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

