import React, { useEffect, useState } from "react";
import { Container, Jumbotron, Row, Col, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const axios = require("axios");

function MyClasses() {
    const [classes, setClasses] = useState({});
    const [className, setClassName] = useState({});
    const [wait, setWait] = useState(false);
    const [promiseName, setPromiseName] = useState(false);
    const [classPkToName, setClassPkToName] = useState({});

    useEffect(() => {
        const loadClasses = async () => {
            axios
                .get(
                    `/api/v1/teachers/${localStorage.getItem(
                        "username"
                    )}/subjects/list/`,
                    {
                        headers: {
                            Authorization: `JWT ${localStorage.getItem("token")}`,
                        },
                    }
                )
                .then((response) => {
                    setClasses(response.data);
                    setWait(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadClasses();
        
        const loadClassName = async() => {
            // for(let i=0; i<Object.keys(classes).length ; i++) {
                axios
                .get(
                    `/api/v1/classes/list/`,
                    {
                        headers: {
                            Authorization: `JWT ${localStorage.getItem("token")}`,
                        },
                    }
                )
                .then((response) => {
                    setClassName(response.data);
                    setPromiseName(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if(wait)
            loadClassName();

        const ClassPkToName = async() => {
            let tempClassName = {};
            for(let i=0;i<Object.keys(className).length;i++){
                tempClassName = {
                    ...tempClassName,
                    [className[i].id] : className[i].name
                }
            }
            setClassPkToName(tempClassName);
        }

        if(promiseName)
            ClassPkToName();

    }, [wait, promiseName]);



    let subjectList;
    if (Object.keys(classes).length > 0) {
        subjectList = classes.map((item) => (
            <tr key={item.id}>
                <td>
                    <Link
                        to={`/profile/class/${item.related_class}/subject/${item.id}/`}
                    >
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "chalkboard"]}
                        />{" "}
                        <b>{classPkToName[item.related_class]}</b>
                    </Link>
                </td>
                <td>
                    <Link
                        to={`/profile/class/${item.related_class}/subject/${item.id}/`}
                    >
                        {" "}
                        <b>{item.name}</b>{" "}
                    </Link>
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
                            <br />
                            <div className="m-5 p-5">
                                <h3 style={{color:'CaptionText'}}>My classes:</h3>
                                <hr />
                                <hr />
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
                                <br />
                                <br />
                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                        </Container>
                    </Jumbotron>
                </Col>
            </Row>
        </div>
    );
}

export default MyClasses;
