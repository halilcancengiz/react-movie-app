import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { firebaseLogin } from "../../services/firebase/firebase";
import ForgotPasswordModal from './../../components/modals/ForgotPasswordModal';
import { MdEmail, RiLockPasswordLine, BsEye, BsEyeSlash } from "../../assets/icons/icons"
import "../../css/membership.css"


const Login = () => {
  const navigate = useNavigate()
  const [login, setLogin] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let user = await firebaseLogin(login.email, login.password)
    if (user) {
      navigate("/", { replace: true })
    }
  }



  const [showPassword, setShowPassword] = useState(false)
  const location = useLocation()
  const [locationState] = useState(location.pathname.startsWith("/login"))
  const locationStateRef = useRef()
  useEffect(() => {
    if (locationState) {
      locationStateRef.current.style.background = "linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))"
    }
  }, [locationState, showPassword])
  return (
    <div  id='login-page-container'>
      <form onSubmit={handleSubmit} id="login-form" className="rounded-3" >

        <div style={{ textStroke: "1px" }} className="d-flex align-items-center mb-3 overflow-hidden">
          <h3 className="w-50 h-100 m-0 p-3 text-center" ref={locationStateRef} ><NavLink to="/register" className="text-uppercase text-white fw-bold fs-5 h-100">register</NavLink></h3>
          <h3 className="w-50 h-100 m-0 p-3 text-center border-start border-dark"><NavLink to="/login" className="text-uppercase text-white fw-bold fs-5 h-100">login</NavLink></h3>
        </div>

        <div className="w-100 d-flex align-items-start justify-content-center my-3">
          <MdEmail color="white" size={20} className="mx-3 my-auto" />
          <input onChange={handleChange} name="email" value={login.email} className="border-0 flex-fill me-2 align-self-stretch bg-transparent text-white border-bottom" type="text" placeholder='Your Email' />
        </div>

        <div className="w-100 d-flex align-items-start justify-content-center my-3">
          <RiLockPasswordLine color="white" size={20} className="mx-3 my-auto" />
          <input onChange={handleChange} name="password" value={login.password} className="border-0 flex-fill me-2 align-self-stretch bg-transparent text-white border-bottom" type={showPassword ? "text" : "password"} placeholder='Your Password' />
          {
            showPassword ?
              <BsEye onClick={() => setShowPassword(!showPassword)} color='white' className='my-auto me-3' size={20} /> :
              <BsEyeSlash onClick={() => setShowPassword(!showPassword)} color='white' className='my-auto me-3' size={20} />
          }
        </div>

        <div className="d-flex align-items-center justify-content-start mx-3">
          <input name="rememberMe" value={login.rememberMe} className='ms-2 me-3' id="rememberMe" type="checkbox" />
          <label className="text-white " htmlFor="rememberMe">Remember Me</label>
        </div>

        <div className="mx-3 mt-3 d-flex align-items-center justify-content-center flex-column">
          <button type="submit" style={{ background: "linear-gradient(to right,rgba(0,0,0,.7),rgba(0,0,0,.7))" }} className="text-uppercase w-100 border-0 fw-bold py-2 text-white" >login</button>
          <div style={{ cursor: "pointer" }} className="text-white border-0 bg-transparent m-0 my-2">
            <ForgotPasswordModal />
          </div>
        </div>
        <div className='d-flex align-items-center justify-content-center'>
          <NavLink to="/" className="my-3 text-white">Back To Home Page</NavLink>
        </div>
      </form>
    </div>
  );
};
export default Login;
