import { Image } from 'antd';
import React from 'react'
import Slider from 'react-slick';
import { posterURL } from '../services/apiURLs';
import { alphabetically } from '../utils/sortHelper';
import defaultImageMan from "../assets/images/defaultManImage.png"
import defaultImageWoman from "../assets/images/defaultWomanImage.png"


function ReactSlickSlider({ data }) {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div>
            <h2> Responsive </h2>
            <Slider {...settings}>
                <div>
                    {
                        data.crew ? data.crew.sort(alphabetically(true)).map((team, index) => (
                            <div className='d-flex flex-column align-items-center justify-content-center me-5' key={index} data-bs-toggle="tooltip" data-bs-placement="top" title={team.name} >
                                <Image preview={team.profile_path === null ? false : true} width={150} height={225} src={team.profile_path ? posterURL(team.profile_path) : team.profile_path === null && (team.gender === 1 || team.gender === 0) ? defaultImageWoman : defaultImageMan} alt={team.name} />
                                <span className='fw-bold mt-1 line-clamp-1'>{team.name}</span>
                                <span className='fst-italic line-clamp-1'>{team.job}</span>
                            </div>
                        )) : "yok"
                    }
                </div>

            </Slider>
        </div>
    )
}

export default ReactSlickSlider