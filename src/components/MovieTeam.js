import React from 'react'
import Slider from 'react-slick';
import { alphabetically } from './../utils/sortHelper';
import { posterURL } from '../services/apiURLs';
import { Image, Tooltip } from 'antd';
import { FaImdb, RiMovieFill } from "../assets/icons/icons"
import defaultImageMan from "../assets/images/defaultManImage.png"
import defaultImageWoman from "../assets/images/defaultWomanImage.png"
import "../css/teams.css"
import { NavLink } from 'react-router-dom';
import { findPersonImdbHelper } from '../utils/findPersonImdbHelper';
import { useSelector } from 'react-redux';




export default function MovieTeam({ movieCredits }) {
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

            <h4 className={movieCredits.crew && movieCredits.crew.every(x => x.profile_path === null) ? "d-none" : "fw-bold text-center my-5 webkitHeader-h4"}>EKIP</h4>
            {
                movieCredits ? (
                    <Slider {...settings}>
                        {
                            movieCredits.crew ? movieCredits.crew.sort(alphabetically(true)).map((team, index) => (
                                <div className='d-flex flex-column align-items-center justify-content-center me-5 position-relative' key={index} data-bs-toggle="tooltip" data-bs-placement="top" title={team.name} >
                                    <div className="movie-actor-image-container  position-relative">
                                        <Image
                                            preview={team.profile_path === null ? false : true}
                                            alt={team.name}
                                            width={150}
                                            height={225}
                                            className="overflow-hidden"
                                            src={team.profile_path ? posterURL(team.profile_path) : team.profile_path === null && (team.gender === 1 || team.gender === 0) ? defaultImageWoman : defaultImageMan}
                                        />
                                        {
                                            team.profile_path === null ? "" : (
                                                <div className='d-flex align-items-center justify-content-between person-info-container w-100'>
                                                    <div className='cursor-pointer' onClick={() => findPersonImdbHelper(team.id, language)}>
                                                        <Tooltip title={`${team.name} IMDB`}>
                                                            <FaImdb size={35} color="#DFB31D" className="m-2 icon-shadow" />
                                                        </Tooltip>
                                                    </div>
                                                    <NavLink to={`/person/${team.name.split(" ").join("")}/${team.id}`}>
                                                        <Tooltip title={`${team.name} bulunduğu diğer filmler`}>
                                                            <RiMovieFill size={35} color='royalblue' className="m-2 icon-shadow" />
                                                        </Tooltip>
                                                    </NavLink>


                                                </div>
                                            )
                                        }
                                    </div>
                                    <span className='fw-bold mt-1 line-clamp-1'>{team.name}</span>
                                    <span className='fst-italic line-clamp-1'>{team.job}</span>
                                </div>
                            )) : ""
                        }
                    </Slider>
                ) : ""
            }

        </>
    )
}
