import React, { useEffect, useState } from "react";
import { Container, Jumbotron, Row, Col, Table, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Link,
    BrowserRouter as Router,
    Route,
    useParams,
} from "react-router-dom";
import Sidebar from "./Sidebar";

const axios = require("axios");

function MySubject() {
    let class_pk = useParams().class_pk;
    let subject_pk = useParams().subject_pk;
    const [studentList, setStudentList] = useState({});
    const [className, setClassName] = useState({});
    const [subjectDetails, setSubjectDetails] = useState({});

    useEffect(() => {
        const loadStudentList = async () => {
            axios
                .get(`/api/v1/classes/${class_pk}/students/list/`, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    setStudentList(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadStudentList();

        const loadClassName = async () => {
            axios
                .get(`/api/v1/classes/${class_pk}/details/`, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    setClassName(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadClassName();

        const loadSubjectDetails = async () => {
            axios
                .get(`/api/v1/classes/subjects/${subject_pk}/details/`, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    setSubjectDetails(response.data[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadSubjectDetails();
    }, []);

    let Name = String(className.name);
    let SubjectName = String(subjectDetails.name);
    let randomKey = 0;
    let StudentList;
    if (Object.keys(studentList).length > 0) {
        StudentList = studentList.map((item) => (
            <tr key={++randomKey}>
                <td>
                    <FontAwesomeIcon
                        className="fa-icon"
                        icon={["fas", "user"]}
                    />{" "}
                    {item.name}
                </td>
            </tr>
        ));
    }

    return (
        <div style={{ backgroundColor: "#B8B8B8" }}>
            <Row>
                <Col sm={4}>
                    <Jumbotron>
                        <Container>
                            <Sidebar />
                        </Container>
                    </Jumbotron>
                </Col>
                <Col sm={8}>
                    <Jumbotron>
                        <Container>
                            <div style={{ textAlign: "center" }}>
                                <br />
                                <br />
                                <h3 style={{color:'CaptionText'}}>
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "chalkboard"]}
                                    />{" "}
                                    Class {Name}
                                </h3>
                                <h5>
                                    <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "book"]}
                                    />{" "}
                                    {SubjectName}
                                </h5>
                                
                            </div>
                            <br />
                            <p style={{ fontSize: "20px" }}>
                                Student List of this class:
                            </p>
                            <hr />
                            <hr />
                            <Table striped hover>
                                <thead>
                                    <th>
                                        <td>Name</td>
                                    </th>
                                </thead>
                                <tbody>{StudentList}</tbody>
                            </Table>
                        </Container>
                    </Jumbotron>
                </Col>
            </Row>
        </div>
    );
}

export default MySubject;
