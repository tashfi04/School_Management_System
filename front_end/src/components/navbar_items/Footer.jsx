import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "react-bootstrap";

const axios = require("axios");

function Footer_up() {
    const [contactUs, setContactUs] = useState({});
    useEffect(() => {
        const loadContatctUs = async () => {
            axios
                .get("/api/v1/institution/contact_info")
                .then((response) => {
                    setContactUs(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadContatctUs();
    }, []);

    return (
        <div style={{ backgroundColor: "#2A2A28" }}>
            <div className="ml-5 mr-5 p-5" style={{ color: "white" }}>
                <Row style={{ fontFamily: "cursive" }}>
                    <Col sm={4}>
                        <h3>Contact Us:</h3>
                        <hr className="new2" />
                        <br />
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "university"]}
                        />{" "}
                            Shahjalal University School
                        <br />
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "search-location"]}
                        />{" "}
                        {String(contactUs.address)}
                        <br />
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "phone-square-alt"]}
                        />{" "}
                        {String(contactUs.phone_no)}
                        <br />
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "envelope"]}
                        />{" "}
                        {String(contactUs.email)}
                        <br />
                    </Col>
                    <Col sm={4}></Col>
                    <Col sm={4}>
                        <h3>Feature Link:</h3>
                        <hr className="new2" />
                        <a
                            href="http://www.sust.edu/"
                            style={{ color: "white" }}
                        >
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "external-link-alt"]}
                            />{" "}
                            SUST
                        </a>
                        <br />
                        <a
                            href="http://www.banbeis.gov.bd/"
                            style={{ color: "white" }}
                        >
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "external-link-alt"]}
                            />{" "}
                            BANBEIS
                        </a>
                        <br />
                        <a
                            href="http://www.nctb.gov.bd/"
                            style={{ color: "white" }}
                        >
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "external-link-alt"]}
                            />{" "}
                            NCTB
                        </a>
                        <br />
                        <a
                            href="http://www.educationboard.gov.bd/"
                            style={{ color: "white" }}
                        >
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "external-link-alt"]}
                            />{" "}
                            Education Board
                        </a>
                        <br />
                        <a
                            href="http://www.dshe.gov.bd/"
                            style={{ color: "white" }}
                        >
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "external-link-alt"]}
                            />{" "}
                            Directorate of Secondary & Higher Education
                        </a>
                        <br />
                        <a
                            href="http://www.moedu.gov.bd/"
                            style={{ color: "white" }}
                        >
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "external-link-alt"]}
                            />{" "}
                            Ministry of Education
                        </a>
                        <br />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Footer_up;
