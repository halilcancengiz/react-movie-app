import { useCallback, useEffect, useState } from 'react'
import { getPersonInfo } from '../services/tmdb/tmdb'
import "../css/person-info.css"
import { imdbURL, posterURL, personImdbURL } from './../services/apiURLs';
import { Image } from 'antd';
import { FaImdb } from 'react-icons/fa';

export default function PersonInfo({ personId, language }) {
    const [person, setPerson] = useState()

    const updatePersonInfo = useCallback(() => {
        getPersonInfo(personId, language).then(result => setPerson(result))
    }, [personId, language])

    useEffect(() => {
        updatePersonInfo()
        console.log(person);
    }, [updatePersonInfo])

    return (
        <>
            {
                person ? (
                    <div style={{ background: `linear-gradient(to right,rgba(0,0,0,.7),rgba(0,0,0,.7)),url()` }} id="info-component-container" className='py-5 m-0 g-0'>
                        <div className="movie-container-info container g-0 d-flex overflow-hidden rounded-4 text-white">
                            {
                                person.profile_path ? (
                                    <div className="position-relative info-image"> 
                                        <img
                                            className='w-100 h-100' 
                                            src={posterURL(person.profile_path)} alt={person.name}   
                                        />
                                        <a href={`${personImdbURL(person.imdb_id)}`} target="_blank" rel="noreferrer"><FaImdb size={45} color="#DFB31D" className="imdb-button position-absolute m-2" /></a>
                                    </div>

                                ) : ""
                            }
                            <div className='movie-info-text-area bg-transparent flex-column flex-fill d-flex align-items-start justify-content-start p-5'>
                                <div className='movie-title h-100 d-flex align-items-center fs-4 fw-bold text-uppercase'>{person.name}
                                    <span className='ms-2 fs-5'>{`${person.birthday}-${person.deathday ? person.deathday : "hayatta"}`}</span>
                                </div>
                                <div className='d-flex align-items-start justify-content-start w-100 flex-column'>
                                    <div className='movie-overview my-2'>
                                        <h6 className='m-0 text-white mb-1'>Özet</h6>
                                        <p className='p-0'>{person.biography}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                ) : ""
            }
        </>


    )
}
