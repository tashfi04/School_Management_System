import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import { Row, Col, Jumbotron } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoticeMarquee from "./Notice/NoticeMarquee";
import "./Home.css";
const axios = require("axios");

function Event() {
    let event_pk = useParams().event_pk;
    const [eventDetails, setEventDetails] = useState({});
    useEffect(() => {
        const loadEvent = async () => {
            axios
                .get(`/api/v1/institution/events/${event_pk}/details/`)
                .then((response) => {
                    setEventDetails(response.data[0]);
                    console.log("rumi", response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadEvent();
    }, []);
    return (
        <Jumbotron>
            <Row>
                <Col md={9}>
                    <div className="p-5" style={{ backgroundColor: "#e9ecef" }}>
                        <div className="pt-3"></div>
                        {/* <div className="pl-5 pr-5"></div> */}
                        <h3 style={{ textAlign: "center" }} className="mb-4">
                            Event Details
                        <hr />
                        </h3>
                        <img
                            src={String(eventDetails.photo)}
                            style={{ height: "70vh", width: "68vw" }}
                            alt="event photo"
                        />
                        <h3 className="pt-3" style={{ textAlign: "center" }}>
                            {String(eventDetails.title)}
                            <br />
                        </h3>
                        <h5 style={{ textAlign: "center" }}>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "calendar-day"]}
                            />{" "}
                            {String(eventDetails.date)}
                        </h5>
                        <hr className="new" />
                        <div className="p-5">
                            {String(eventDetails.description)}
                        </div>
                    </div>
                </Col>
                <Col
                    md={3}
                    style={{
                        backgroundColor: "rgb(194 225 255)",
                        height: "70vh",
                    }}
                >
                    <NoticeMarquee />
                </Col>
            </Row>
        </Jumbotron>
    );
}

export default Event;
