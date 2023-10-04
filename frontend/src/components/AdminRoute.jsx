import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Reroute users not logged into "login" page
const AdminRoute = () => {

    const {userInfo} = useSelector(state => state.auth);

    return userInfo && userInfo.isAdmin ? <Outlet/> : <Navigate to='/login' replace/>
};

export default AdminRoute