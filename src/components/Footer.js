import { NavLink } from 'react-router-dom'
import { BsGithub, BsInstagram, BsLinkedin, BsTwitter, BsFacebook } from "../assets/icons/icons"
import "../css/footer.css"

export default function Footer() {

    return (
        <footer className='container-fluid d-flex align-items-center justify-content-center p-5'>
            <div className="container m-0 p-0 g-0">
                <div className="row m-0 p-0 g-0">
                    <div className="col-12">
                        <div className="social-media d-flex align-items-center justify-content-center  container">
                            <NavLink className="github-icon p-2" to="">
                                <BsGithub style={{ transition: "all .5s ease-in-out" }} className='mx-3' size={35} color="white" />
                            </NavLink>
                            <NavLink className="instagram-icon p-2" to="">
                                <BsInstagram style={{ transition: "all .5s ease-in-out" }} className='mx-3 ' size={35} color="white" />
                            </NavLink>
                            <NavLink className="linkedin-icon p-2" to="">
                                <BsLinkedin style={{ transition: "all .5s ease-in-out" }} className='mx-3 ' size={35} color="white" />
                            </NavLink>
                            <NavLink className="twitter-icon p-2" to="">
                                <BsTwitter style={{ transition: "all .5s ease-in-out" }} className='mx-3 ' size={35} color="white" />
                            </NavLink>
                            <NavLink className="facebook-icon p-2" to="">
                                <BsFacebook style={{ transition: "all .5s ease-in-out" }} className='mx-3 ' size={35} color="white" />
                            </NavLink>
                        </div>
                        <div className='text-center d-flex align-items-center justify-content-center'>
                            <span className='text-white'>Api Kaynağı : </span>
                            <a style={{ width: "50px", height: "50px" }} className="tmdb-footer-logo p-2" rel='noreferrer' target="_blank" href="https://www.themoviedb.org/">
                                <img className='w-100 h-100' src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="tmdb-logo" />
                            </a>
                        </div>
                        <div className='d-flex flex-column text-center'>
                            <span className='text-white'>Copyright &copy; Tüm Hakları Saklıdır </span>
                            <span className='text-white'>This application was made by Halil Can Cengiz in 2022.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
