import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Profile.scss";
const axios = require("axios");

function TeacherShow() {
    const [teacherDetails, setTeacherDetails] = useState({});

    useEffect(() => {
        const loadTeacherDetails = async () => {
            axios
                .get("/api/v1/teachers/details/", {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                  console.log(response.data[0])
                    setTeacherDetails(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadTeacherDetails();
    },[]);

    return (
        <Container fluid>
            <div className="mb-3 container profile">
                <Row>
                    <Col sm={6}>
                        <h2>
                            <FontAwesomeIcon icon={["fas", "user"]} /> {"  "}
                            {teacherDetails.name}
                        </h2>
                    </Col>
                    <Col sm={6}>
                        <Image
                            style={{ height: '25vh', width: '20vw' }}
                            src={`${teacherDetails.photo}`}
                            thumbnail
                        />
                    </Col>
                </Row>
                <hr></hr>
                <Row>
                    <Col>
                        <h6>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "university"]}
                            />{" "}
                            Designation:{" "}
                        </h6>
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder={teacherDetails.designation}
                            readOnly
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <h6>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "envelope"]}
                            />{" "}
                            Email:{" "}
                        </h6>
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder={teacherDetails.email}
                            readOnly
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <h6>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "fax"]}
                            />{" "}
                            Fax:{" "}
                        </h6>
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder={teacherDetails.fax}
                            readOnly
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <h6>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "phone-square-alt"]}
                            />{" "}
                            Telephone:{" "}
                        </h6>
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder={teacherDetails.office_telephone}
                            readOnly
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <h6>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "address-card"]}
                            />{" "}
                            Present Address:{" "}
                        </h6>
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder={teacherDetails.present_address}
                            readOnly
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <h6>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "calendar-day"]}
                            />{" "}
                            Data of Birth:{" "}
                        </h6>
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder={teacherDetails.date_of_birth}
                            readOnly
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <h6>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "calendar-alt"]}
                            />{" "}
                            Joining Date:{" "}
                        </h6>
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder={teacherDetails.date_of_join}
                            readOnly
                        />
                    </Col>
                </Row>
                <br />
            </div>
        </Container>
    );
}

export default TeacherShow;
