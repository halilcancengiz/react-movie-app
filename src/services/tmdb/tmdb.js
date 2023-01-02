export const getTopRatedMovies = async (page, language) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=${language}&page=${page}`);
    const json = await response.json();
    return json.results;
}
export const getPopularMovies = async (page, language) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=${language}&page=${page}`);
    const json = await response.json();
    return json.results;
}
//random film aratmak için kullanılacak
export const getMovieDetails = async (movieId, language) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`);
    const json = await response.json();
    return json
}
export const getMovieCredits = async (movieId, language) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`);
    const json = await response.json();
    return json;
}
export const getMovieTrailer = async (movieId, language) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`);
    const json = await response.json();
    return json.results;
}
export const getSimilarMovies = async (movieId, language) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=${language}&page=1`);
    const json = await response.json();
    return json.results;
}
export const searchMovie = async (query, language) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=${language}&query=${query.replace("-", " ")}`);
    const json = await response.json();
    const filteredjson = json.results.filter(x => x.vote_average > 0 && x.overview.length > 0 && x.poster_path)
    return filteredjson;
}
export const getPersonOtherMovies = async (personId, language) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_cast=${personId}&language=${language}`);
    const json = await response.json();
    return json.results
}
export const getPersonInfo = async (personId, language) => {
    const response = await fetch(`https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`);
    const json = await response.json();
    return json
}
export const getUpcomingMovies = async (language) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`);
    const json = await response.json();
    const filteredjson = json.results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    return filteredjson
}

export const searchByGenreId = async (genreId, page, language) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${genreId}&language=${language}&page=${page}`)
    const json = await response.json()
    const filteredJson = await json.results.sort((a, b) => b.vote_average - a.vote_average)
    return await filteredJson
}