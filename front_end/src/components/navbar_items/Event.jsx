import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
// import { Carousel, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <div style={{ backgroundColor: "#e9ecef" }}>
            <div className="pt-5"></div>
            <div className="pl-5 pr-5">

            </div>
            <img
                src={String(eventDetails.photo)}
                style={{ height: "70vh", width: "98vw" }}
                className="p-5"
                alt="event photo"
            />
            <h3 style={{ textAlign: "center" }}>
                {String(eventDetails.title)}
                <br />
                <br />
            </h3>
            <h5 style={{ textAlign: "center" }}>
                <FontAwesomeIcon
                    className="fa-icon"
                    icon={["fas", "calendar-day"]}
                />{" "}
                {String(eventDetails.date)}
            </h5>
            <div className="p-5">{String(eventDetails.description)}</div>
        </div>
    );
}

export default Event;
