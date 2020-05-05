import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CustomNavbar from'./components/CustomNavbar'
import Home from './components/Home'
import Academics from './components/Academics'
import Administration from './components/Administration'
import Facilities from './components/Facilities'
import Notice from './components/Notice'
import About from './components/About'
import CustomFooter from './components/CustomFooter'

function App() {
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
        <CustomFooter />
      </div>
    </Router>
  );
}

export default App;
