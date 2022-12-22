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
export const searchMovie = async (params, language) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=${language}&query=${params.querry.replace("-", " ")}&page=1&include_adult=false&`);
    const json = await response.json();
    return json.results;
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
