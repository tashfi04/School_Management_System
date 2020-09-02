import React, { Component } from 'react'
import './CustomNavbar.css'
import UnauthNav from './UnauthNav'
import AuthNav from './AuthNav'

export default class CustomNavbar extends Component {
    render()
    {
        if(localStorage.getItem('token')){
            return <AuthNav />
        }
        else
            return <UnauthNav />

    }
}
