import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Reroute users not logged into "login" page
const PrivateRoute = () => {

    const {userInfo} = useSelector(state => state.auth);

    return userInfo ? <Outlet/> : <Navigate to='/login' replace/>
};

export default PrivateRoute