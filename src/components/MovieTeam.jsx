import { memo } from 'react'
import React from 'react';
import useRedux from '../hooks/useRedux';
import { NavLink } from 'react-router-dom';
import { posterURL } from '../services/apiURLs';
import { alphabetically } from './../utils/sortHelper';
import { findPersonImdbHelper } from '../utils/findPersonImdbHelper';
import { teamSettings } from '../utils/sliderSettings';
import { Image, Tooltip } from 'antd';
import Slider from 'react-slick';
import { FaImdb, RiMovieFill } from "../assets/icons/icons"
import defaultImageMan from "../assets/images/defaultManImage.png"
import defaultImageWoman from "../assets/images/defaultWomanImage.png"
import { useTranslation } from 'react-i18next';
import "../css/teams.css"


export default memo(function MovieTeam({ movieCredits }) {
    const { t } = useTranslation()
    const { language } = useRedux()

    return (
        <div className='container'>
            <h4 className={movieCredits.crew && movieCredits.crew.length > 0 ? "fw-bold text-center text-uppercase w-100 my-5 webkitHeader-h4" : "d-none"}>{t("team")}</h4>
            {
                movieCredits ? (
                    <Slider {...teamSettings}>
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
                                                            <RiMovieFill size={35} color='dodgerblue' className="m-2 icon-shadow" />
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
        </div>



    )
})
