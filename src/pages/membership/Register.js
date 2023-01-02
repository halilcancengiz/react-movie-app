/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useRef, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { BsEye, BsEyeSlash, MdEmail, RiLockPasswordLine, BsArrowRepeat } from "../../assets/icons/icons"
import { firebaseRegister } from "../../services/firebase/firebase";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import "../../css/membership.css"



export default function Register() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [register, setRegister] = useState({
        email: "",
        password: "",
        rePassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const location = useLocation()
    const [locationState] = useState(location.pathname.startsWith("/register"))
    const locationStateRef = useRef()

    const handleChange = (e) => {
        setRegister({ ...register, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let result = await firebaseRegister(register.email, register.password, register.rePassword)
        if (result) {
            navigate("/", { replace: true })
        }
    }
    useEffect(() => {
        if (locationState) {
            locationStateRef.current.style.background = "linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))"
        }
    }, [locationState, showPassword])
    return (
        <div id='register-page-container'>
            <Helmet>
                <title>{t("register")}</title>
            </Helmet>
            <form onSubmit={handleSubmit} id="register-form" className="rounded-3" >
                <div style={{ textStroke: "1px" }} className="d-flex align-items-center mb-3">
                    <h3 className="w-50 h-100 m-0 p-3 text-center" ref={locationStateRef} ><NavLink to="/register" className="text-uppercase text-white fw-bold fs-5 h-100">{t("register")}</NavLink></h3>
                    <h3 className="w-50 h-100 m-0 p-3 text-center border-start border-dark" ref={locationStateRef}><NavLink to="/login" className="text-uppercase text-white fw-bold fs-5 h-100">{t("login")}</NavLink></h3>
                </div>
                <div className="w-100 d-flex align-items-start justify-content-center my-3">
                    <MdEmail color="white" size={20} className="mx-3 my-auto" />
                    <input onChange={handleChange} name="email" value={register.email} className="border-0 flex-fill me-2 align-self-stretch bg-transparent text-white border-bottom" type="text" placeholder={t("yourEmail")} />
                </div>
                <div className="w-100 d-flex align-items-start justify-content-center my-3">
                    <RiLockPasswordLine color="white" size={20} className="mx-3 my-auto" />
                    <input onChange={handleChange} name="password" value={register.password} className="border-0 flex-fill me-2 align-self-stretch bg-transparent text-white border-bottom" type={showPassword ? "text" : "password"} placeholder={t("yourPassword")} />
                    {
                        showPassword ?
                            <BsEye onClick={() => setShowPassword(!showPassword)} color='white' className='my-auto me-3' size={20} /> :
                            <BsEyeSlash onClick={() => setShowPassword(!showPassword)} color='white' className='my-auto me-3' size={20} />
                    }
                </div>
                <div className="w-100 d-flex align-items-start justify-content-center my-3">
                    <BsArrowRepeat color="white" size={20} className="mx-3 my-auto" />
                    <input onChange={handleChange} name="rePassword" value={register.rePassword} className="border-0 flex-fill me-2 align-self-stretch bg-transparent text-white border-bottom" type={showPassword ? "text" : "password"} placeholder={t("reEnterPassword")} />
                    {
                        showPassword ?
                            <BsEye onClick={() => setShowPassword(!showPassword)} color='white' className='my-auto me-3' size={20} /> :
                            <BsEyeSlash onClick={() => setShowPassword(!showPassword)} color='white' className='my-auto me-3' size={20} />
                    }
                </div>
                <div className="mx-3 mt-4 mb-3 d-flex align-items-center justify-content-center flex-column">
                    <button style={{ background: "linear-gradient(to right,rgba(0,0,0,.7),rgba(0,0,0,.7))" }} className="text-uppercase w-100 border-0 fw-bold py-2 text-white" type="submit">{t("register")}</button>
                </div>
                <div className='d-flex align-items-center justify-content-center'>
                    <NavLink to="/" className="my-3 text-white">{t("backToHomePage")}</NavLink>
                </div>
            </form>
        </div>
    )
}
