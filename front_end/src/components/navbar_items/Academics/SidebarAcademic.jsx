import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function SidebarAcademic() {
    return (
        <div className='mt-5 pt-5'>
            <h5>
                <FontAwesomeIcon className="fa-icon" icon={["fas", "school"]} />{" "}
                {"    "}
                <Link to="/academics/overview" style={{ color: "black" }}>
                    OverView
                </Link>
            </h5>
            <hr />
            <h5>
                <FontAwesomeIcon
                    className="fa-icon"
                    icon={["fas", "chalkboard"]}
                />{" "}
                {"    "}
                <Link to="/academics/classes" style={{ color: "black" }}>
                    Classes
                </Link>
            </h5>
            <hr />
            <h5>
                <FontAwesomeIcon
                    className="fa-icon"
                    icon={["fas", "chalkboard-teacher"]}
                />{" "}
                {"    "}
                <Link to="/academics/teachers" style={{ color: "black" }}>
                    Teachers
                </Link>
            </h5>
            <hr />
        </div>
    );
}

export default SidebarAcademic;
