import { NavLink } from 'react-router-dom';
import { alphabetically } from "../utils/sortHelper"
import { posterURL } from "../services/apiURLs"
import Slider from 'react-slick';
import defaultImageMan from "../assets/images/defaultManImage.png"
import defaultImageWoman from "../assets/images/defaultWomanImage.png"
import { Empty, Image, Tooltip } from 'antd';
import { FaImdb } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RiMovieFill } from '../assets/icons/icons';
import { findPersonImdbHelper } from './../utils/findPersonImdbHelper';
import "../css/actors.css"



export default function Actors({ header, movieCredits }) {
    const language = useSelector(state => state.language.language)
    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slideCount: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slideCount: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slideCount: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slideCount: 2,
                    slidesToScroll: 2,
                    initialSlide: 0,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slideCount: 1,
                    slidesToScroll: 1,
                    initialSlide: 0
                }
            }
        ]
    };

    return (
        <>
            <h4 className='fw-bold text-center my-5 webkitHeader-h4'>AKTORLER</h4>

            {
                movieCredits.cast ? (
                    <Slider {...settings}>
                        {
                            movieCredits.cast ? movieCredits.cast.sort(alphabetically(true)).map((actor) => (
                                <div key={actor.id} className="d-flex flex-column  align-items-center justify-content-center me-5" data-bs-toggle="tooltip" data-bs-placement="top" title={actor.name}>
                                    <div className="movie-actor-image-container  position-relative">
                                        <Image
                                            preview={actor.profile_path === null ? false : true}
                                            alt={actor.name}
                                            width={150}
                                            height={225}
                                            className="overflow-hidden"
                                            src={actor.profile_path ? posterURL(actor.profile_path) : actor.profile_path === null && (actor.gender === 1 || actor.gender === 0) ? defaultImageWoman : defaultImageMan}
                                        />
                                        {
                                            actor.profile_path === null ? "" : (
                                                <div className='d-flex align-items-center justify-content-between person-info-container w-100 '>
                                                    <div className='cursor-pointer' onClick={() => findPersonImdbHelper(actor.id, language)}>
                                                        <Tooltip title={`'${actor.name}' IMDB`}>
                                                            <FaImdb size={35} color="#DFB31D" className="m-2 icon-shadow" />
                                                        </Tooltip>
                                                    </div>
                                                    <NavLink to={`/person/${actor.name.split(" ").join("")}/${actor.id}`}>
                                                        <Tooltip title={`'${actor.name}' bulunduğu diğer filmler.`}>
                                                            <RiMovieFill size={35} className="m-2 icon-shadow" />
                                                        </Tooltip>
                                                    </NavLink>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <span style={{ width: "150px" }} className='fw-bold mt-1 line-clamp-1 text-center'>{actor.name}</span>
                                    <span style={{ width: "150px" }} className='fst-italic line-clamp-1 text-center'>{actor.character}</span>
                                </div>
                            )) : "yok"
                        }
                    </Slider>
                ) : <Empty />
            }




        </>

    )
}
