
import { useLocation, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from "framer-motion"
import Popular from '../pages/Popular'
import TopRatedMovies from '../pages/TopRatedMovies';
import Login from '../pages/membership/Login';
import Register from "../pages/membership/Register"
import Main from '../pages/Main';
import NotFound from '../pages/NotFound';
import MovieDetails from '../pages/MovieDetails';
import Profile from '../pages/Profile';
import PopularMoviesLayout from '../components/Layouts/PopularMoviesLayout';
import TopRatedMoviesLayout from '../components/Layouts/TopRatedMoviesLayout';
import HomeLayout from '../components/Layouts/HomeLayout';
import SearchList from "../components/SearchList"
import PersonDetails from './../pages/PersonDetails';
import UseRedux from '../hooks/useRedux';


export default function AnimatedRoutes() {
    const { user } = UseRedux()
    const location = useLocation()
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>

                <Route path='/' element={<HomeLayout />}>
                    <Route index={true} element={<Main />} />
                    <Route path="/react-movie-app/" element={<Main />} />
                    <Route path='/search/:query' element={<SearchList />} />
                    {user ? "" : <Route path="login" element={<Login />} />}
                    {user ? "" : <Route path="register" element={<Register />} />}
                </Route>
                
                {user ? <Route path="/profile/:userName" element={<Profile />} /> : ""}


                <Route path='/popular-movies' element={<PopularMoviesLayout />}>
                    <Route index element={<Popular />} />
                    <Route path='?page=:currentpage' element={<Popular />} />
                </Route>

                <Route path='/top-rated-movies' element={<TopRatedMoviesLayout />}>
                    <Route index element={<TopRatedMovies />} />
                    <Route path='?page=:currentpage' element={<TopRatedMovies />} />
                </Route>

                <Route path="/person/:personName/:personId" element={<PersonDetails />} />

                <Route path='/movie/:id/:title' element={<MovieDetails />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>

    )
}
