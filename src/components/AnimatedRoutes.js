import { useSelector } from 'react-redux';
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
import Loading from '../components/Loading';
import PersonDetails from './../pages/PersonDetails';


export default function AnimatedRoutes() {
    const location = useLocation()
    const user = useSelector(state => state.auth.user)
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path='/loading' element={<Loading />} />

                <Route path='/' element={<HomeLayout />}>
                    <Route index={true} element={<Main />} />
                    <Route path='/search/:querry' element={<SearchList />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                <Route path="/profile/:userName" element={<Profile />} />

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
