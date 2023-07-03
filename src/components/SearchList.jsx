import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { searchMovie } from '../services/tmdb/tmdb';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';
import { useTranslation } from 'react-i18next';

function SearchList() {
  const selectLanguage = state => state.language;
  const getLanguage = createSelector(
    selectLanguage,
    language => language
  );
  const language = useSelector(getLanguage);

  const { t } = useTranslation();
  const [searchMovieList, setSearchMovieList] = useState([]);
  const { query } = useParams();

  const updateSearchMovie = useCallback(() => {
    searchMovie(query, language.language).then(result => setSearchMovieList(result));
  }, [query, language]);

  useEffect(() => {
    updateSearchMovie();
  }, [updateSearchMovie]);

  return (
    <div style={{ minHeight: '100vh' }}>
      <h4 className='webkitHeader-h4 text-uppercase text-center w-100 my-5'>{`${query}-${t('searchResults')}`}</h4>
      <div className='container d-flex align-items-center justify-content-center flex-wrap mx-auto'>
        {searchMovieList && <MovieCard movieList={searchMovieList} />}
      </div>
      <SearchBar />
    </div>
  );
}

export default SearchList;
