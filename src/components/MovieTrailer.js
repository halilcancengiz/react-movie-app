import { getMovieTrailer } from './../services/tmdb/tmdb';
import { useCallback, useState, useEffect } from 'react';

export default function MovieTrailer({ movieId, language }) {
    const [movieVideos, setMovieVideos] = useState([]);

    const officialTrailer = movieVideos ? movieVideos.filter(t => t.type === "Trailer") : "";

    const updateMovieVideos = useCallback(() => {
        getMovieTrailer(movieId, language).then(result => setMovieVideos(result))
    }, [movieId, language])

    useEffect(() => {
        updateMovieVideos()
    }, [updateMovieVideos])
    return (
        <>
            {
                officialTrailer[0] ? (
                    <div className='movie-trailer d-flex align-items-center justify-content-center flex-column'>
                        <h4 className='fw-bold text-uppercase my-5 webkitHeader-h4'>Fragman</h4>
                        <iframe
                            className='w-100'
                            title='movie-trailer'
                            allowFullScreen="allowfullscreen"
                            width={1000}
                            height={500}
                            src={`https://www.youtube.com/embed/${officialTrailer[0] ? officialTrailer[0].key : ""}`} frameBorder="0">
                        </iframe>
                    </div>
                ) : ""
            }
        </>
    )
}
