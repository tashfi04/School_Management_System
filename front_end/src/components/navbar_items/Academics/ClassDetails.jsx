import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, useParams } from "react-router-dom";
import { Row, Col, Container, Image, Table } from "react-bootstrap";
import SidebarAcademic from "./SidebarAcademic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Routines from "./Routines";

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
                    console.log(response.data);
                    setSubjects(response.data);
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
        <Container style={{ margin: "auto" }}>
            <Row>
                <Col sm={4} md={4} className='pt-5'>
                    <Container style={{border:'solid', borderColor:'#ebebeb'}}>
                        <SidebarAcademic />
                    </Container>
                </Col>
                <Col sm={8} md={8} style={{backgroundColor:'#ebebeb'}} className='pt-5'>
                    <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        textAlign:'align'
                    }}
                    >
                        <h3>
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
                                    {detail.group === "Sci" ? (
                                        <div>Group Science</div>
                                    ) : detail.group === "Bus" ? (
                                        <div>Group Business Studies</div>
                                    ) : detail.group === "Hum" ? (
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
                                icon={["fas", "book"]}
                            />{" "}
                            {"    "}
                            Subjects:
                        </h5>
                        <br />
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Teacher</th>
                                </tr>
                            </thead>
                            <tbody>{subjectsTable}</tbody>
                        </Table>

                        <br />
                        <br />
                        <h5>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "calendar-alt"]}
                            />{" "}
                            {"    "}
                            Routine:
                        </h5>
                        <br />
                        <Routines class_pk={class_pk}/>
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
                            className="d-block w-100 mb-5"
                            src={detail.syllebus}
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ClassDetails;
