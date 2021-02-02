import React, { useEffect, useState } from "react";
import { Container, Jumbotron, Row, Col, Table } from "react-bootstrap";
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
    const [examList, setExamList] = useState({});

    useEffect(() => {
        const loadStudentList = async () => {
            axios
                .get(`/api/v1/classes/${class_pk}/students/list/`, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
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

        const loadExamList = async () => {
            axios
                .get(`/api/v1/classes/subjects/${subject_pk}/exams/list/`, {
                    headers: {
                        Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                })
                .then((response) => {
                    setExamList(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadExamList();
    }, []);

    let Name = String(className.name);
    let SubjectName = String(subjectDetails.name);

    const StudentShow = () => {
        const show = [];
        if (Object.keys(studentList).length > 0) {
            for (let j = 0; j < Object.keys(studentList).length; j += 3) {
                show.push(
                    <tr key={j}>
                        <td>
                            {studentList[j] ? (
                                <div>
                                    {String(studentList[j].name)}
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </td>
                        <td>
                            {studentList[j + 1] ? (
                                <div>
                                    {/* <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "user"]}
                                    />{" "} */}
                                    {studentList[j + 1].name}
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </td>
                        <td>
                            {studentList[j + 2] ? (
                                <div>
                                    {/* <FontAwesomeIcon
                                        className="fa-icon"
                                        icon={["fas", "user"]}
                                    />{" "} */}
                                    {studentList[j + 2].name}
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </td>
                    </tr>
                );
            }
        }
        return show;
    };

    let showExamList;
    if (Object.keys(examList).length > 0) {
        showExamList = examList.map((item) => (
            <tr key={item.id}>
                <td>
                    <Link
                        to={`/profile/class/${class_pk}/exam/${item.id}/subject/${subject_pk}/`}
                    >
                        <h6 style={{ color: "white" }}> {item.exam_type} </h6>
                    </Link>
                </td>
            </tr>
        ));
    }

    return (
        <Container style={{ margin: "auto" }}>
            <Row>
                <Col sm={3} md={3} className="pt-5">
                    <Container
                        style={{ border: "solid", borderColor: "#ebebeb" }}
                    >
                        <Sidebar />
                    </Container>
                </Col>
                <Col sm={9}>
                    <Container className="pl-5" style={{textAlign:'center',backgroundColor: "#ebebeb"}}>
                        <div>
                            <br />
                            <br />
                            <h3 style={{ color: "CaptionText" }}>
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
                        <Table striped hover size="sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Name</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>{StudentShow()}</tbody>
                        </Table>
                        <br />
                        <hr />
                        <h5> Exam List </h5>
                        <hr />
                        <hr />
                        <Table striped hover variant="dark" size="sm">
                            <thead>
                                <tr>
                                    <th>Exam</th>
                                </tr>
                            </thead>
                            <tbody>{showExamList}</tbody>
                        </Table>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default MySubject;
