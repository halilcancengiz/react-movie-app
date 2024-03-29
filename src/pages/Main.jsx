import { useEffect, useState, useCallback, useMemo } from "react";
import MovieCard from "./../components/MovieCard";
import Pagination from "../components/Pagination";
import SearchBar from "./../components/SearchBar";
import { NavLink, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { getUpcomingMovies, searchByGenreId } from "./../services/tmdb/tmdb";
import { Helmet } from "react-helmet";
import { posterURL } from "./../services/apiURLs";
import { genres } from "../utils/genres";
import { mainSettings } from "../utils/sliderSettings";
import { Segmented, Tooltip } from "antd";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../css/main.css";

const Main = () => {
  const selectLanguage = (state) => state.language;
  const getLanguage = createSelector(
    selectLanguage,
    (language) => language.language
  );
  const language = useSelector(getLanguage);

  const [movies, setMovies] = useState([]);
  const [genreId, setGenreId] = useState(null);
  const [genreName, setGenreName] = useState(null);
  const [searchList, setSearchList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const genresName = useMemo(() => genres.map((name) => language === "en-EN" ? name.en : name.tr), [language]);
  const { t } = useTranslation();

  const checkGenresValue = useCallback(
    (e) => {
      const findGenre = genres.find((x) =>
        language === "tr-TR" ? x.tr === e : x.en === e
      );
      if (findGenre && findGenre.id) {
        setGenreId(findGenre.id);
        setSearchParams(1);
      }
    },
    [language, setSearchParams]
  );

  const fetchMovies = useCallback(async () => {
    const upcomingMovies = await getUpcomingMovies(language);
    setMovies(upcomingMovies);

    checkGenresValue();

    const searchResult = await searchByGenreId(genreId, page, language);
    setSearchList(searchResult);
  }, [language, genreId, page, checkGenresValue]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="d-flex flex-column">
      <Helmet>
        <title>
          {genreName
            ? `${genreName} Filmleri - Sayfa-${page}`
            : t("mainPage")}
        </title>
        <meta
          name="description"
          content="Bu sayfada güncel filmler ve kategoriye göre sıralanmış filmler yer almaktadır."
        />
      </Helmet>

      <div className="d-flex flex-column container mx-auto">
        <h4 className="webkitHeader-h4 text-center text-uppercase my-5">
          {t("currentMovies")}
        </h4>
      </div>

      <div className="container">
        <Slider {...mainSettings}>
          {movies.map((item) => (
            <div key={item.id}>
              <NavLink
                to={`/movie/${item.id}/${item.title.replace(/\s/g, "")}`}
                className="h-100 d-flex align-items-center justify-content-center p-0 m-0 "
              >
                <Tooltip title={item.original_title}>
                  <LazyLoadImage
                    style={{
                      boxShadow: "0 0 10px black",
                      borderRadius: "20px",
                      margin: "10px",
                      background: "#0A253E",
                    }}
                    effect="blur"
                    width="150px"
                    height="100%"
                    alt={item.original_title}
                    src={posterURL(item.poster_path)}
                  />
                </Tooltip>
              </NavLink>
            </div>
          ))}
        </Slider>
      </div>

      <h4 className="webkitHeader-h4 text-center text-uppercase mt-5">
        {t("categories")}
      </h4>

      <div className="container mx-auto p-0 text-center d-flex align-items-center justify-content-center flex-column mt-4">
        <Segmented
          style={{ background: "linear-gradient(to bottom,rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))" }}
          className="py-1 w-100 text-center text-white fw-bold"
          onChange={(e) => {
            checkGenresValue(e);
            setGenreName(e);
          }}
          options={genresName}
        />
      </div>

      <div className="searchList d-flex flex-wrap mx-auto container align-items-center justify-content-center">
        {searchList && <MovieCard movieList={searchList} />}
      </div>

      <Pagination page={page} setSearchParams={setSearchParams} />
      <SearchBar />
    </div>
  );
};

export default Main;
