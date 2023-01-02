import { getMovieTrailer } from './../services/tmdb/tmdb';
import { useCallback, useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import "../css/movie-trailer.css"

export default memo(function MovieTrailer({ movieId, language }) {
    const { t } = useTranslation()
    const [movieVideos, setMovieVideos] = useState([]);

    const officialTrailer = movieVideos ? movieVideos.filter(t => t.type === "Trailer") : "";

    const updateMovieVideos = useCallback(() => {
        getMovieTrailer(movieId, language).then(result => setMovieVideos(result))
    }, [movieId, language])

    useEffect(() => {
        updateMovieVideos()
    }, [updateMovieVideos])
    return (
        <div className='movie-trailer container d-flex align-items-center justify-content-center flex-column'>
            {
                officialTrailer[0] ? (
                    <>
                        <h4 className='fw-bold text-uppercase my-5 webkitHeader-h4'>{t("trailer")}</h4>
                        <iframe
                            className='rounded-5'
                            title='movie-trailer'
                            allowFullScreen="allowfullscreen"
                            src={`https://www.youtube.com/embed/${officialTrailer[0] ? officialTrailer[0].key : ""}`} frameBorder="0">
                        </iframe>
                    </>
                ) : ""
            }
        </div >
    )
})
