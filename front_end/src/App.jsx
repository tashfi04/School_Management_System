import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthNav from "./components/navbar_items/AuthNav";
import Home from "./components/navbar_items/Home";
import Administration from "./components/navbar_items/Administration";
import Facilities from "./components/navbar_items/Facilities";
import Notice from "./components/navbar_items/Notice/Notice";
// import CustomFooter from "./components/navbar_items/CustomFooter";
import Login from "./components/user_authentication/Login";
import Registration from "./components/user_authentication/Registration";
import Logout from "./components/user_authentication/Logout";
import Profile from "./components/navbar_items/profile/Profile";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Overview from "./components/navbar_items/Academics/Overview";
import Classes from "./components/navbar_items/Academics/Classes";
import ClassDetails from "./components/navbar_items/Academics/ClassDetails";
import Teachers from "./components/navbar_items/Academics/Teachers";
import MyClasses from "./components/navbar_items/profile/MyClasses";
import MySubject from "./components/navbar_items/profile/MySubject";
import Footer from "./components/navbar_items/Footer";
import Event from "./components/navbar_items/Event";
import MarksheetTeacher from "./components/navbar_items/profile/Marksheet/MarksheetTeacher";
import NoticeDetails from "./components/navbar_items/Notice/NoticeDetails";

library.add(far, fas, fab);

// const axios = require("axios");

function App() {
    return (
        <Router>
            <div>
                {/* <CustomNavbar username={username} /> */}
                <AuthNav />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path ="/event/:event_pk/" component={Event} />
                    <Route path="/administration/" component={Administration} />

                    <Route path="/academics/overview/" component={Overview}></Route>
                    <Route path="/academics/classes/" component={Classes}></Route>
                    <Route path="/academics/classdetails/:class_pk/" component={ClassDetails}></Route>
                    <Route path="/academics/teachers/" component={Teachers}></Route>

                    <Route path="/facilities" component={Facilities}></Route>
                    <Route path="/notice/" component={Notice}></Route>
                    <Route path="/noticedetails/:notice_pk/" component={NoticeDetails}></Route>
                    <Route path="/login/" component={Login}></Route>

                    <Route path="/profile/dashboard/" component={Profile}></Route>
                    <Route path="/profile/myclasses/" component={MyClasses}></Route>
                    <Route path="/profile/class/:class_pk/subject/:subject_pk/" component={MySubject}></Route>
                    <Route path="/profile/class/:class_pk/exam/:exam_pk/subject/:subject_pk/" component={MarksheetTeacher}></Route>

                    <Route path="/logout/" component={Logout}></Route>
                    <Route path="/registration/" component={Registration}></Route>
                </Switch>
                <Footer />
                {/* <CustomFooter /> */}
            </div>
        </Router>
    );
}

export default App;
