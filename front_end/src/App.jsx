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

const axios = require('axios')



function App() {
  
  const [username, setusername] = useState('')
  //const [password, setpassword] = useState('')
  //const [displayed_form, setdisplayed_form] = useState('')
  //const [logged_in, setlogged_in] = useState('')

  useEffect(() => {
    let endpoint = "http://127.0.0.1:8000/authentication/current_user/";
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
  },[])

  return (
    <Router>
      <div>
        <CustomNavbar />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About}></Route>
        <Route path="/administration" component={Administration} />
        <Route path="/academics" component={Academics}></Route>
        <Route path="/facilities" component={Facilities}></Route>
        <Route path="/notice" component={Notice}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/registration" component={Registration}></Route>
        <CustomFooter />
      </div>
    </Router>
  );
}

export default App;
