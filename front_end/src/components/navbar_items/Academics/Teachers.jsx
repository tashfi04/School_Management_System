import React, { useEffect, useState } from "react";
import { Row, Col, Jumbotron, Container, Table } from "react-bootstrap";
import SidebarAcademic from "./SidebarAcademic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const axios = require("axios");

function Teachers() {
    const [teachersList, setTeachersList] = useState({});

    useEffect(() => {
        const loadTeachers = async () => {
            axios
                .get("/api/v1/teachers/list/")
                .then((response) => {
                    setTeachersList(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadTeachers();
    }, []);

    let teachersTable;
    if (Object.keys(teachersList).length > 0) {
        teachersTable = teachersList.map((item) => (
            <tr key={item.id} style={{ fontSize: "20px" }}>
                <td>{item.name}</td>
                <td>{item.designation}</td>
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
                            <h3>
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "chalkboard-teacher"]}
                                />{" "}
                                {"    "}
                                Teachers
                            </h3>
                            <br />
                            <div style={{ fontSize: "20px" }}>
                                Teachers of Shahjalal University School are
                                listed below:
                            </div>
                            <hr />
                            <hr />
                            <br />
                            <br />
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr style={{ fontSize: "25px" }}>
                                        <th>Name</th>
                                        <th>Designation</th>
                                    </tr>
                                </thead>
                                <tbody>{teachersTable}</tbody>
                            </Table>
                            <br />
                            <br />
                        </Container>
                    </Jumbotron>
                </Col>
            </Row>
        </div>
    );
}

export default Teachers;
