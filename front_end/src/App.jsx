import React, { useState,useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CustomNavbar from'./components/navbar_items/CustomNavbar'
import Home from './components/navbar_items/Home'
import Academics from './components/navbar_items/Academics'
import Administration from './components/navbar_items/Administration'
import Facilities from './components/navbar_items/Facilities'
import Notice from './components/navbar_items/Notice'
import About from './components/navbar_items/About'
import CustomFooter from './components/navbar_items/CustomFooter'
import Login from './components/user_authentication/Login'
import Registration from './components/user_authentication/Registration';
import Logout from './components/user_authentication/Logout';
import Profile from './components/navbar_items/Profile';
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";



const axios = require('axios')



function App() {
  
  const [username, setusername] = useState('')
  //const [password, setpassword] = useState('')
  //const [displayed_form, setdisplayed_form] = useState('')
  //const [logged_in, setlogged_in] = useState('')

  useEffect(() => {
    let endpoint = "/api/v1/authentication/current_user/";
    let config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    };
    axios.get(endpoint,config)
    .then(json => {
      console.log(json.data.username)
      setusername(json.data.username)
    })
    .catch(err => {
      console.log(err)
    })
  },[username])

  return (
    <Router>
      <div>
        <CustomNavbar username={username} />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About}></Route>
        <Route path="/administration" component={Administration} />
        <Route path="/academics" component={Academics}></Route>
        <Route path="/facilities" component={Facilities}></Route>
        <Route path="/notice" component={Notice}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/registration" component={Registration}></Route>
        <CustomFooter />
      </div>
    </Router>
  );
}

export default App;
