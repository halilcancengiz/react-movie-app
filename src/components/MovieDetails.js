/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { posterURL, movieDetailsURL, movieCreditsURL, movieTrailerURL } from "../utils/allApiUrlsHelper";

import Actors from './Actors';
import MovieTeam from './MovieTeam';
import MovieTrailer from './MovieTrailer';
import SimilarMovies from './SimilarMovies';

import { useParams } from 'react-router-dom';
import { Image } from 'antd';
import "../css/movie-details.css";
import Loading from './Loading';

export default function MovieDetails() {
    const { id } = useParams();
    const movieId = id;
    // STATES
    const [movieDetails, setMovieDetail] = useState([]);
    const [movieCredits, setMovieCredits] = useState([]);
    const [movieVideos, setMovieVideos] = useState([]);
    const [movieWriter, setMovieWriter] = useState([]);
    const [movieDirector, setMovieDirector] = useState([]);
    // VARIABLES
    const officialTrailer = movieVideos ? movieVideos.filter(t => t.type === "Trailer") : "";
    useEffect(() => {
        async function getMovieDetails() {
            const response = await fetch(movieDetailsURL(movieId));
            const json = await response.json();
            const resMovieCredits = await fetch(movieCreditsURL(movieId));
            const credits = await resMovieCredits.json();
            const writer = await credits.crew.filter(x => x.department === "Writing");
            const director = await credits.crew.filter(x => x.department === "Directing");
            const resMovieVideo = await fetch(movieTrailerURL(movieId));
            const video = await resMovieVideo.json();
            setMovieDetail(json);
            setMovieCredits(credits);
            setMovieVideos(video.results);
            setMovieWriter(writer);
            setMovieDirector(director);
        }
        setTimeout(() => {
            getMovieDetails();
        }, 1500)

    }, [movieId])
    return (

        <main className='container g-0 p-0 mt-5 px-3' >
            <div className="row movie-details-first-area mx-auto">
                <div className="col-md-4 p-0 position-relative mx-auto" id='movie-details-poster-container' >
                    <Image
                        src={posterURL() + movieDetails.poster_path} alt={movieDetails.original_title}
                    />
                </div>
                <div className="col-lg-8 p-0 mx-auto">
                    <div className="container h-100">
                        <div className="row h-100">
                            <div className="col-12 py-3 px-5 bg-white">
                                <div className='d-flex align-items-center justify-content-center w-100 flex-column'>
                                    <div className='movie-title h-100 d-flex align-items-center fs-5 fw-bold text-uppercase'>{movieDetails.original_title}</div>
                                    <div className='movie-tagline h-100 d-flex align-items-center fst-italic fs-6 text-capitalize'>{movieDetails.tagline}</div>
                                    <div className='movie-release-date h-100 d-flex align-items-center fs-6 fw-bold fst-italic'>{movieDetails.release_date ? movieDetails.release_date.slice(0, 4) : "Bilinmiyor"}</div>
                                </div>
                                <div className='movie-genres text-center'>
                                    {
                                        movieDetails.genres ? movieDetails.genres.map(genres => (
                                            <span key={genres.id} className='badge bg-dark text-white me-2'>{genres.name}</span>
                                        )) : ""
                                    }
                                </div>
                                <div className='movie-overview text-center '>
                                    <p className='p-0 mt-2'>{movieDetails.overview}</p>
                                </div>
                                <div className='production-companies d-flex align-items-center flex-column justify-content-center w-100'>
                                    <div className='d-flex'>
                                        {
                                            movieDetails.production_companies ? movieDetails.production_companies.map(comp => (
                                                <div key={comp.id} className={comp.logo_path === null ? "d-none" : "mx-4 d-flex align-items-center justify-content-center "}>
                                                    <img style={{ maxWidth: "100px", minWidth: "50px" }} className="w-100" src={`https://image.tmdb.org/t/p/original${comp.logo_path}`} alt={comp.name} data-bs-toggle="tooltip" data-bs-placement="top" title={comp.name} />
                                                </div>
                                            )) : ""
                                        }
                                    </div>
                                    {movieId}
                                </div>
                                <div className='movie-budget-writter-director d-flex align-items-start justify-content-around my-2 flex-wrap'>
                                    <div className='movie-budget d-flex align-items-center justify-content-center flex-column'>
                                        <span className='text-dark fw-bold border py-1 px-2 border-end-0 border-start-0 border-top-0 border-dark text-uppercase'>Writer</span>
                                        <p style={{ letterSpacing: "1px" }} className='m-0 p-0 fs-6 fst-italic d-flex flex-column justify-content-center align-items-center'>{movieWriter ? movieWriter.map((w, index) => (
                                            <span key={index}>{w.name}</span>
                                        )) : "-"}</p>
                                    </div>
                                    <div className='movie-budget d-flex align-items-center justify-content-center flex-column'>
                                        <span className='text-dark fw-bold border py-1 px-2 border-end-0 border-start-0 border-top-0 border-dark text-uppercase'>Budget</span>
                                        <p style={{ letterSpacing: "1px" }} className='m-0 p-0 fs-6 fst-italic'>{movieDetails && movieDetails.budget !== 0 ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', notation: "compact" }).format(movieDetails.budget) : <span className='text-danger'>Bilinmiyor</span>}</p>
                                    </div>
                                    <div className='movie-budget d-flex align-items-center justify-content-center flex-column'>
                                        <span className='text-dark fw-bold border py-1 px-2 border-end-0 border-start-0 border-top-0 border-dark text-uppercase'>Director</span>
                                        <p style={{ letterSpacing: "1px" }} className='m-0 p-0 fs-6 fst-italic d-flex flex-column justify-content-center align-items-center'>{movieDirector ? movieDirector.map((director, index) => (
                                            <span key={index} >{director.name}</span>
                                        )) : "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-5 mx-auto p-0 g-0 d-flex align-items-center justify-content-center flex-column bg-white px-2 shadow-lg rounded-3'>
                <MovieTrailer officialTrailer={officialTrailer} />
                <SimilarMovies movieId={movieId} />
                <Actors movieCredits={movieCredits} header={"OYUNCULAR"} />
                <MovieTeam movieCredits={movieCredits} header={"TEAM"} />
            </div>
        </main >


    )
}
