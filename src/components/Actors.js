import React from 'react'
import { useSelector } from 'react-redux';
import { alphabetically } from "../utils/sortHelper"
import { posterURL } from "../utils/allApiUrlsHelper"
import { Image } from 'antd';
import defaultImageMan from "../assets/images/defaultManImage.png"
import defaultImageWoman from "../assets/images/defaultWomanImage.png"



export default function Actors({ header, movieCredits }) {
    return (
        <>
            <h4 className='fw-bold text-center my-5'>{header}</h4>
            <div className='movie-actors scrollWebkit w-100 px-3 rounded-3 py-4 d-flex align-items-center justify-content-start flex-row'>
                {
                    movieCredits.cast ? movieCredits.cast.sort(alphabetically(true)).map((actor) => (
                        <div key={actor.id} className="d-flex flex-column align-items-center justify-content-center me-5" data-bs-toggle="tooltip" data-bs-placement="top" title={actor.name}>
                            <Image
                                preview={actor.profile_path === null ? false : true}
                                width={150}
                                height={225}
                                src={actor.profile_path && posterURL() ? posterURL() + actor.profile_path : actor.profile_path === null && (actor.gender === 1 || actor.gender === 0) ? defaultImageWoman : defaultImageMan}
                            />
                            <span style={{ width: "150px" }} className='fw-bold mt-1 line-clamp-1 text-center'>{actor.name}</span>
                            <span style={{ width: "150px" }} className='fst-italic line-clamp-1 text-center'>{actor.character}</span>
                        </div>
                    )) : "yok"
                }
            </div>
        </>

    )
}
