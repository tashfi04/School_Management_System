import React, { useEffect, useState } from "react";
import { Row, Col, Container, Table } from "react-bootstrap";
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
            <tr key={item.id}>
                <td
                    style={{
                        borderLeft: "solid",
                        borderLeftColor: "#555573",
                        borderLeftWidth: "3px",
                    }}
                >
                    {item.name}
                </td>
                <td>{item.designation}</td>
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
                <Col sm={8} md={8} style={{backgroundColor:'#ebebeb'}}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            textAlign:'center'
                        }}
                        className='pt-5'
                    >
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
                            Teachers of Shahjalal University School are listed
                            below:
                        </div>
                        <hr />
                        <hr />
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            borderLeft: "solid",
                                            borderLeftColor: "#555573",
                                            borderLeftWidth: "3px",
                                        }}
                                    >
                                        Name
                                    </th>
                                    <th>Designation</th>
                                </tr>
                            </thead>
                            <tbody>{teachersTable}</tbody>
                        </Table>
                        <br />
                        <br />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Teachers;
