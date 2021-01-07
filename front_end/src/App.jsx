import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthNav from "./components/navbar_items/AuthNav"
import Home from "./components/navbar_items/Home";
import Administration from "./components/navbar_items/Administration";
import Facilities from "./components/navbar_items/Facilities";
import Notice from "./components/navbar_items/Notice";
import CustomFooter from "./components/navbar_items/CustomFooter";
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
import ClassDetails from "./components/navbar_items/Academics/ClassDetails"
import Teachers from "./components/navbar_items/Academics/Teachers";
import MyClasses from "./components/navbar_items/profile/MyClasses";
import MySubject from "./components/navbar_items/profile/MySubject";

library.add(far, fas, fab);

const axios = require("axios");

function App() {

    // Don't recognize why to use it :
    
    
    //const [username, setusername] = useState("");
    // useEffect(() => {
    //     let endpoint = "/api/v1/authentication/current_user/";
    //     let config = {
    //         headers: {
    //             Authorization: `JWT ${localStorage.getItem("token")}`,
    //         },
    //     };
    //     axios
    //         .get(endpoint, config)
    //         .then((json) => {
    //             setusername(json.data.username);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [username]);

    return (
        <Router>
            <div>
                {/* <CustomNavbar username={username} /> */}
                <AuthNav />
                <Route exact path="/" component={Home} />
                <Route path="/administration/" component={Administration} />

                <Route path="/academics/overview/" component={Overview}></Route>
                <Route path="/academics/classes/" component={Classes}></Route>
                <Route path="/academics/classdetails/:class_pk/" component={ClassDetails}></Route>
                <Route path="/academics/teachers/" component={Teachers}></Route>

                <Route path="/facilities" component={Facilities}></Route>
                <Route path="/notice" component={Notice}></Route>
                <Route path="/login" component={Login}></Route>

                <Route path="/profile/dashboard/" component={Profile}></Route>
                <Route path="/profile/myclasses/" component={MyClasses}></Route>
                <Route path="/profile/class/:class_pk/subject/:subject_pk/" component={MySubject}></Route> 

                <Route path="/logout/" component={Logout}></Route>
                <Route path="/registration" component={Registration}></Route>
                <CustomFooter />
            </div>
        </Router>
    );
}

export default App;
