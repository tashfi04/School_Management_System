import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'
import "./Profile.scss";

function Sidebar() {
    return (
        <div>
            <Jumbotron>
                <Container>
                    <h5>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "chart-line"]}
                        />{" "}
                        {"    "}
                        <Link to="#"  style={{color:"black"}}>Dashboard</Link>
                    </h5>
                    <hr />
                    <h5>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "chart-line"]}
                        />{" "}
                        {"    "}
                        <Link to="#"  style={{color:"black"}}>Information</Link>
                    </h5>
                    <hr />
                    <h5>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "chart-line"]}
                        />{" "}
                        {"    "}
                        <Link to="#"  style={{color:"black"}}>Address Book</Link>
                    </h5>
                    <hr />
                    <h5>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "chart-line"]}
                        />{" "}
                        {"    "}
                        <Link to="#" style={{color:"black"}}>My Orders</Link>
                    </h5>
                    <hr />
                    <h5>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "chart-line"]}
                        />{" "}
                        {"    "}
                        <Link to="#"  style={{color:"black"}}>My Rewards</Link>
                    </h5>
                    <hr />
                    <h5>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "chart-line"]}
                        />{" "}
                        {"    "}
                        <Link to="#"  style={{color:"black"}}>My Reviews</Link>
                    </h5>
                    <hr />
                    <h5>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "chart-line"]}
                        />{" "}
                        {"    "}
                        <Link to="#"  style={{color:"black"}}>Wishlist</Link>
                    </h5>
                </Container>
            </Jumbotron>
        </div>
    );
}

export default Sidebar;
