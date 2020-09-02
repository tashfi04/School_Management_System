import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

function Logout() {

    useEffect (() => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.reload(false);
    },[]);

    return (
        <Redirect to="/" />
    ) 
}

export default Logout
