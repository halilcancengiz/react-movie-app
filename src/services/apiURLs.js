export const posterURL = (posterPath) => {
    return `https://www.themoviedb.org/t/p/original/${posterPath}`
}
export const imdbURL = (imdbId) => {
    return `https://www.imdb.com/title/${imdbId}/?ref_=fn_al_tt_1`
}
export const personImdbURL = (imdbId) => {
    return `https://www.imdb.com/name/${imdbId}/?ref_=nv_sr_srsg_0`
}