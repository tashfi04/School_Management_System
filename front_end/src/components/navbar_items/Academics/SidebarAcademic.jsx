import React from "react";
import { Link } from "react-router-dom";

function SidebarAcademic() {
    return (
        <div>
            <h5>
                {/* <FontAwesomeIcon className="fa-icon" icon={["fas", "school"]} />{" "}
                {"    "} */}
                <Link to="/academics/overview" style={{ color: "black" }}>
                    Overview
                </Link>
            </h5>
            <hr style={{border:'solid', borderWidth:'1px'}}/>
            <h5>
                {/* <FontAwesomeIcon
                    className="fa-icon"
                    icon={["fas", "chalkboard"]}
                />{" "}
                {"    "} */}
                <Link to="/academics/classes" style={{ color: "black" }}>
                    Classes
                </Link>
            </h5>
            <hr style={{border:'solid', borderWidth:'1px'}}/>
            <h5 className='pb-4'>
                {/* <FontAwesomeIcon
                    className="fa-icon"
                    icon={["fas", "chalkboard-teacher"]}
                />{" "}
                {"    "} */}
                <Link to="/academics/teachers" style={{ color: "black" }}>
                    Teachers
                </Link>
            </h5>
        </div>
    );
}

export default SidebarAcademic;
