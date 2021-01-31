import React, { useEffect, useState } from "react";
import { Jumbotron, Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SidebarAcademic from "./SidebarAcademic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const axios = require("axios");

const Classes = (props) => {
    const [classes, setClasses] = useState({});

    useEffect(() => {
        const loadClasses = async () => {
            axios
                .get("/api/v1/classes/list/")
                .then((response) => {
                    console.log(response.data);
                    setClasses(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        loadClasses();
        // console.log(classes);
    }, []);

    let classCards;
    if (Object.keys(classes).length > 0) {
        classCards = classes.map((item) => (
            <>
                <Card
                    border="primary"
                    className="m-2"
                    style={{ width: "400px" }}
                >
                    <Card.Body>
                        <Card.Title style={{ color: "blue" }}>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "chalkboard"]}
                            />{" "}
                            {"    "}
                            Class {item.name}
                        </Card.Title>
                        <Card.Subtitle style={{ color: "black" }}>
                            {item.group === "Sci" ? (
                                <div>Science</div>
                            ) : item.group === "Bus" ? (
                                <div>Business</div>
                            ) : item.group === "Hum" ? (
                                <div>Humanities</div>
                            ) : (
                                <div></div>
                            )}
                        </Card.Subtitle>
                        <br />

                        <h6 style={{ color: "blue" }}>
                            <FontAwesomeIcon
                                className="fa-icon"
                                icon={["fas", "chalkboard-teacher"]}
                            />{" "}
                            {"    "}
                            Class Teacher {item.class_teacher}
                        </h6>
                        <Link to={`/academics/classdetails/${item.id}`}>
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{
                                    float: "right",
                                    marginBottom: "10px",
                                    backgroundColor: "#04B059",
                                }}
                            >
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "external-link-alt"]}
                                    color="white"
                                />{" "}
                                {"    "}
                                <b style={{ color: "white" }}>Enter</b>
                            </Button>
                        </Link>
                    </Card.Body>
                </Card>
            </>
        ));
    }

    return (
        <Container style={{ margin: "auto" }}>
            <Row>
                <Col sm={2} md={2}>
                    <Container>
                        <SidebarAcademic />
                    </Container>
                </Col>
                <Col sm={10} md={10} style={{backgroundColor:'#ebebeb'}}>
                    <h3 className="pt-5 pb-3" style={{textAlign:'center'}}>
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "chalkboard"]}
                        />{" "}
                        {"    "}
                        Classes
                    </h3>
                    {Object.keys(classes).length > 0 ? (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "center",
                            }}
                        >
                            {classCards}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Classes;
