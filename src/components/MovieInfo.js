import { posterURL, imdbURL } from "../services/apiURLs";
import { useState, useCallback, useEffect, memo } from 'react';
import { AiOutlineClockCircle, FaImdb } from "../assets/icons/icons"
import { useTranslation } from 'react-i18next';
import { getMovieDetails } from "../services/tmdb/tmdb";
import "../css/movie-info.css"

export default memo(function MovieInfo({ movieId, movieCredits, language }) {
    const { t } = useTranslation()
    const [movieDetails, setMovieDetail] = useState([]);
    const [movieWriter, setMovieWriter] = useState([]);
    const [movieDirector, setMovieDirector] = useState([]);


    // useCallback START
    const updateMovieDetailsAndCredits = useCallback(async () => {
        await getMovieDetails(movieId, language).then(result => setMovieDetail(result))
        if (movieCredits && movieCredits.crew) {
            const writer = movieCredits.crew.filter(crew => crew.department === "Writing");
            const director = movieCredits.crew.filter(crew => crew.department === "Directing")
            setMovieWriter(writer)
            setMovieDirector(director)
        }
    }, [movieId, language, movieCredits])


    // useCallback END

    useEffect(() => {
        updateMovieDetailsAndCredits()
    }, [updateMovieDetailsAndCredits])
    return (
        <div style={{ background: `linear-gradient(to right,rgba(0,0,0,.7),rgba(0,0,0,.7)),url(${movieDetails && movieDetails.backdrop_path ? posterURL(movieDetails.backdrop_path) : ""})` }} id="info-component-container" className='py-5 m-0 g-0'>
            <div className="movie-container-info container g-0 d-flex overflow-hidden rounded-4 text-white">
                {
                    movieDetails.poster_path ? (
                        <div className="position-relative info-image">
                            <img
                                className='w-100 h-100'
                                src={posterURL(movieDetails.poster_path)} alt={movieDetails.original_title}
                            />
                            <a href={`${imdbURL(movieDetails.imdb_id)}`} target="_blank" rel="noreferrer"><FaImdb size={45} color="#DFB31D" className="imdb-button position-absolute m-2" /></a>
                        </div>

                    ) : ""
                }

                <div className='movie-info-text-area bg-transparent flex-fill d-flex align-items-start justify-content-start p-5'>
                    <div className='d-flex align-items-start justify-content-start w-100 flex-column'>
                        <div className="title-realese-date-container">
                            <div className='movie-title h-100 d-flex align-items-center fs-4 fw-bold text-uppercase'>
                                {movieDetails.original_title}
                            </div>
                            <div>
                                <span className='movie-realese-date ms-lg-2 fs-5'>{`(${movieDetails.release_date ? movieDetails.release_date : "-"})`}</span>
                            </div>
                        </div>

                        <div className='movie-genres text-center mb-3 d-flex align-items-center'>
                            <span className='me-2 fs-6 text-lowercase fw-semibold'><AiOutlineClockCircle size={25} />{` ${movieDetails.runtime ? movieDetails.runtime : "-"}`}<sub>m</sub></span>
                            {
                                movieDetails.genres ? movieDetails.genres.map(genres => (
                                    <span key={genres.id} className='badge bg-primary text-white me-2'>{genres.name}</span>
                                )) : ""
                            }
                        </div>
                        <div className="overflow-hidden">
                            <div className='fs-12 movie-tagline infinity-slide-animation h-100 d-flex align-items-center fw-semibold fst-italic text-capitalize'>{movieDetails.tagline}</div>
                        </div>

                        <div className='movie-overview my-2'>
                            <h6 className='m-0 text-white mb-1'>{t("summary")}</h6>
                            <p className='p-0'>{movieDetails.overview}</p>
                        </div>

                        <div className="writer-director-budget-container w-100 flex-wrap">
                            <div className='movie-writer d-flex align-items-center justify-content-center flex-column me-4'>
                                <span className='rounded-3 fw-bold border border-white py-1 px-2 border-end-0 border-start-0 border-top-0 border-dark text-uppercase'>{t("writer")}</span>
                                <p className='spacing-1 m-0 p-0 fs-6 fst-italic d-flex flex-column justify-content-center align-items-center'>
                                    {
                                        movieWriter ? movieWriter.slice(0, 1).map((writer, index) => (
                                            <span key={index}>{writer.name}</span>
                                        )) : "-"
                                    }
                                </p>
                            </div>
                            <div className='movie-director d-flex align-items-center justify-content-center flex-column me-4'>
                                <span className='rounded-3 fw-bold border border-white py-1 px-2 border-end-0 border-start-0 border-top-0 border-dark text-uppercase'>{t("director")}</span>
                                <p className='spacing-1 m-0 p-0 fs-6 fst-italic d-flex flex-column justify-content-center align-items-center'>{movieDirector ? movieDirector.slice(0, 1).map((director, index) => (
                                    <span key={index} >{director.name}</span>
                                )) : "-"}</p>
                            </div>
                            <div className='movie-budget d-flex align-items-center justify-content-center flex-column'>
                                <span className='rounded-3 fw-bold border border-white py-1 px-2 border-end-0 border-start-0 border-top-0 border-dark text-uppercase'>{t("budget")}</span>
                                <p className='spacing-1 m-0 p-0 fs-6 fst-italic'>{movieDetails && movieDetails.budget !== 0 ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol', notation: "compact" }).format(movieDetails.budget) : "-"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
})
