import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'

function SidebarAcademic() {
    return (
        <div>
            <Jumbotron>
                <Container>
                    <h5>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "school"]}
                        />{" "}
                        {"    "}
                        <Link to="/academics/overview"  style={{color:"black"}}>OverView</Link>
                    </h5>
                    <hr />
                    <h5>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "chalkboard"]}
                        />{" "}
                        {"    "}
                        <Link to="/academics/classes"  style={{color:"black"}}>Classes</Link>
                    </h5>
                    <hr />
                    <h5>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "chalkboard-teacher"]}
                        />{" "}
                        {"    "}
                        <Link to="/academics/teachers"  style={{color:"black"}}>Teachers</Link>
                    </h5>
                    <hr />
                </Container>
            </Jumbotron>
        </div>
    );
}

export default SidebarAcademic;
