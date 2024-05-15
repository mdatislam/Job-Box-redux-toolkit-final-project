import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../Shared/Loading';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { pathname } = useLocation()

    const { isLoading,userInfo: {email} } = useSelector(state => state.auth)
    console.log(email)
    if (isLoading) {
        return <Loading></Loading>
    }

    if (!isLoading && !email) {
        return <Navigate to="/login" state={{ path: pathname }} ></Navigate>
    }
    return children
};

export default PrivateRoute;