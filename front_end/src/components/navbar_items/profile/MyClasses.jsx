import React, { useEffect, useState } from "react";
import { Container, Jumbotron, Row, Col, Table, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const axios = require("axios");

function MyClasses() {
    const [classes, setClasses] = useState({});
    useEffect(() => {
        const loadClasses = async () => {
            axios
                .get(
                    `/api/v1/teachers/${localStorage.getItem(
                        "username"
                    )}/subjects/list/`,
                    {
                        headers: {
                            Authorization: `JWT ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(response.data);
                    setClasses(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadClasses();
    }, []);

    let subjectList;
    if (Object.keys(classes).length > 0) {
        subjectList = classes.map((item) => (
            <tr>
                <td>{item.related_class}</td>
                <td>{item.name}</td>
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
                            <div className="m-5 p-5">
                                <h3>My classes:</h3>
                                <br />
                                <br />
                                <Table striped hover>
                                    <tbody>
                                        <tr>
                                            <th>Class</th>
                                            <th>Subject</th>
                                        </tr>
                                        {subjectList}
                                    </tbody>
                                </Table>
                            </div>
                        </Container>
                    </Jumbotron>
                </Col>
            </Row>
        </div>
    );
}

export default MyClasses;
