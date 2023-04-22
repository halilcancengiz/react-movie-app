import React from 'react';
import { Outlet } from 'react-router-dom';

function HomeLayout() {
    console.count("Home Layout")
    return (
        <Outlet />
    )
}
export default HomeLayout