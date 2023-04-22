import React from 'react';
import { Outlet } from 'react-router-dom'

const PopularMoviesLayout = () => {
    console.count("PopularMovies Layout")
    return (
        <Outlet />
    )
}

export default PopularMoviesLayout