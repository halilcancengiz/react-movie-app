import React from 'react'
import { alphabetically } from './../utils/sortHelper';
import { posterURL } from '../utils/allApiUrlsHelper';
import { Image } from 'antd';
import defaultImageMan from "../assets/images/defaultManImage.png"
import defaultImageWoman from "../assets/images/defaultWomanImage.png"

export default function MovieTeam({ movieCredits, header }) {
    return (
        <>
            <h4 className={movieCredits.crew && movieCredits.crew.every(x => x.profile_path === null) ? "d-none" : "fw-bold text-center my-5"}>{header}</h4>
            <div className='movie-team scrollWebkit w-100 py-4 d-flex align-items-center justify-content-start flex-row px-3 mb-5'>
                {
                    movieCredits.crew ? movieCredits.crew.sort(alphabetically(true)).map((team, index) => (
                        <div className='d-flex flex-column align-items-center justify-content-center me-5' key={index} data-bs-toggle="tooltip" data-bs-placement="top" title={team.name} >
                            <Image preview={team.profile_path === null ? false : true} width={150} height={225} src={team.profile_path && posterURL() ? posterURL() + team.profile_path : team.profile_path === null && (team.gender === 1 || team.gender === 0) ? defaultImageWoman : defaultImageMan} alt={team.name} />
                            <span className='fw-bold mt-1 line-clamp-1'>{team.name}</span>
                            <span className='fst-italic line-clamp-1'>{team.job}</span>
                        </div>
                    )) : "yok"
                }
            </div>
        </>
    )
}
