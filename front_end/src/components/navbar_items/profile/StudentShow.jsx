import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Profile.scss";

const axios = require("axios");

function StudentShow() {
    const [studentDetails, setStudentDetails] = useState({});

    useEffect(() => {
        const loadStudentDetails = async () => {
            axios
                .get("/api/v1/students/details/", {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    setStudentDetails(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadStudentDetails();
    },[]);

    return (
        <Container fluid>
            {studentDetails ? (
                <div>
                    <div className="mb-3 container profile">
                        <Row>
                            <Col sm={6}>
                                <h2>
                                    <FontAwesomeIcon icon={["fas", "user"]} />{" "}
                                    {"  "}
                                    {studentDetails.name}
                                </h2>
                            </Col>
                            <Col sm={6}>
                                <Image
                                    style={{ height: "75%", width: "75%" }}
                                    src={`${studentDetails.photo}`}
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
                                        icon={["fas", "book"]}
                                    />{" "}
                                    Current Class:{" "}
                                </h6>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={studentDetails.current_class}
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
                                        icon={["fas", "praying-hands"]}
                                    />{" "}
                                    Religion:{" "}
                                </h6>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={studentDetails.religion}
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
                                        icon={["fas", "male"]}
                                    />{" "}
                                    Father's Name:{" "}
                                </h6>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={studentDetails.father_name}
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
                                        icon={["fas", "female"]}
                                    />{" "}
                                    Mother's Name:{" "}
                                </h6>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={studentDetails.mother_name}
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
                                        icon={["fas", "male"]}
                                    />{" "}
                                    Guardian's Name:{" "}
                                </h6>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={studentDetails.guardian_name}
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
                                        icon={["fas", "globe-asia"]}
                                    />{" "}
                                    Nationality:{" "}
                                </h6>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={studentDetails.nationality}
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
                                    placeholder={studentDetails.date_of_birth}
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
                                    placeholder={studentDetails.date_of_join}
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
                                        icon={["fas", "school"]}
                                    />{" "}
                                    Previous School:{" "}
                                </h6>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={studentDetails.previous_school}
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
                                        icon={["fas", "sort-numeric-up-alt"]}
                                    />{" "}
                                    TC Number:{" "}
                                </h6>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={studentDetails.tc_number}
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
                                    Contact Number:{" "}
                                </h6>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={studentDetails.telephone}
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
                                    Emergency Contact Number:{" "}
                                </h6>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={
                                        studentDetails.emergency_telephone
                                    }
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
                                    Email Address:{" "}
                                </h6>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={studentDetails.email}
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
                                    placeholder={
                                      studentDetails.present_address
                                    }
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
                                    Permanent Address:{" "}
                                </h6>
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={
                                      studentDetails.permanent_address
                                    }
                                    readOnly
                                />
                            </Col>
                        </Row>
                        <br />
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </Container>
    );
}

export default StudentShow;
