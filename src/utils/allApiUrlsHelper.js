export const posterURL = () => {
    return "https://www.themoviedb.org/t/p/original"
}
export const movieDetailsURL = (movieId) => {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-EN`
}
export const movieCreditsURL = (movieId) => {
    return `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
}
export const movieTrailerURL = (movieId) => {
    return `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
}

export const similarMoviesURL = (movieId) => {
    return `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
}
export const popularMoviesAPIURL = (page) => {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
}
export const movieSearchURL = (params) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${params.querry.replace("-", " ")}&page=1&include_adult=false&`
}

