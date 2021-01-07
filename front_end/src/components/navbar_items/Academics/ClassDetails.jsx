import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import { Row, Col, Jumbotron, Container, Image, Table } from "react-bootstrap";
import SidebarAcademic from "./SidebarAcademic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const axios = require("axios");

function ClassDetails() {
    let class_pk = useParams().class_pk;
    const [detail, setDetail] = useState({});
    const [subjects, setSubjects] = useState({});

    useEffect(() => {
        const loadDetails = async () => {
            axios
                .get(`/api/v1/classes/${class_pk}/details/`)
                .then((response) => {
                    console.log("fuck test", response.data[0]);
                    setDetail(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadDetails();

        const loadSubjects = async () => {
            axios
                .get(`/api/v1/classes/${class_pk}/subjects/list/`)
                .then((response) => {
                    console.log(response.data)
                    setSubjects(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadSubjects();

        
    }, []);

    let subjectsTable;
    if (Object.keys(subjects).length > 0) {
        subjectsTable = subjects.map((item) => (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.teacher}</td>
            </tr>
        ));
    }

    return (
        <div style={{ backgroundColor: "#B8B8B8" }}>
            <Row>
                <Col sm={4}>
                    <Jumbotron>
                        <Container>
                            <SidebarAcademic />
                        </Container>
                    </Jumbotron>
                </Col>
                <Col sm={8}>
                    <Jumbotron>
                        <Container>
                            <br />
                            <br />
                            <h3 style={{ color: "blue" }}>
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "chalkboard"]}
                                />{" "}
                                {"    "}
                                Class {detail.name}
                            </h3>
                            {detail.name ? (
                                <div>
                                    <h6>
                                        {detail.group == "Sci" ? (
                                            <div>Group Science</div>
                                        ) : detail.group == "Bus" ? (
                                            <div>Group Business Studies</div>
                                        ) : detail.group == "Hum" ? (
                                            <div>Group Humanities</div>
                                        ) : (
                                            <div></div>
                                        )}
                                    </h6>
                                </div>
                            ) : (
                                <div></div>
                            )}
                            <br />
                            <h5>
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "chalkboard-teacher"]}
                                />{" "}
                                {"  "}
                                Class Teacher {detail.class_teacher}
                            </h5>
                            <br />
                            <br />
                            <h5>
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "book-open"]}
                                />{" "}
                                {"    "}
                                Syllabus:
                            </h5>
                            <br />
                            <Image
                                style={{ height: "50vh" }}
                                className="d-block w-100"
                                src={detail.syllebus}
                            />
                            <br />
                            <br />
                            <h4>
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "book"]}
                                />{" "}
                                {"    "}
                                Subjects:
                            </h4>
                            <br />
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Teacher</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subjectsTable}
                                </tbody>
                            </Table>
                        </Container>
                    </Jumbotron>
                </Col>
            </Row>
        </div>
    );
}

export default ClassDetails;
