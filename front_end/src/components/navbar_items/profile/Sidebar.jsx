import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./Profile.scss";

function Sidebar() {
    return (
        <div>
            <Jumbotron>
                <Container>
                    {localStorage.getItem("role") == "4" ? (
                        // For students sidebar
                        <div>
                            <br />
                            <br />
                            <br />
                            <h5>
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "chart-line"]}
                                />{" "}
                                {"    "}
                                <Link to="/profile" style={{ color: "black" }}>
                                    Dashboard
                                </Link>
                            </h5>
                            <hr />
                            <h5>
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "poll-h"]}
                                />{" "}
                                {"    "}
                                <Link to="#" style={{ color: "black" }}>
                                    Marksheet
                                </Link>
                            </h5>
                            <hr />
                            <h5>
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "table"]}
                                />{" "}
                                {"    "}
                                <Link to="#" style={{ color: "black" }}>
                                    Routine
                                </Link>
                            </h5>
                            <hr />
                            <h5>
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "info-circle"]}
                                />{" "}
                                {"    "}
                                <Link to="#" style={{ color: "black" }}>
                                    Information
                                </Link>
                            </h5>
                            <br />
                            <br />
                            <br />
                        </div>
                    ) : (
                        // for teachers sidebar
                        <div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <h5>
                            <Link to="/profile/dashboard" style={{ color: "black" }}>
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "chart-line"]}
                                />{" "}
                                {"    "}
                                    Dashboard
                                </Link>
                            </h5>
                            <hr />
                            <h5>
                                <Link to="/profile/myclasses" style={{ color: "black" }}>
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "chalkboard"]}
                                    />{" "}
                                    {"    "}
                                    My Classes
                                </Link>
                            </h5>
                            <hr />
                            <h5>
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "info-circle"]}
                                />{" "}
                                {"    "}
                                <Link to="#" style={{ color: "black" }}>
                                    Information
                                </Link>
                            </h5>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                    )}
                </Container>
            </Jumbotron>
        </div>
    );
}

export default Sidebar;
