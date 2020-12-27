import React, { useEffect, useState } from "react";
import { Jumbotron, Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SidebarAcademic from "./SidebarAcademic";

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
                }, console.log("vai", classes))
                .catch((error) => {
                    console.log(error);
                });
        };
        loadClasses();
        console.log(classes);
    }, []);

    let classCards;
    if (Object.keys(classes).length > 0) {
        classCards = classes.map((item) => (
            <div key={item.id}>
                <Card border="primary" style={{ width: "30vw" }}>
                    <Card.Body>
                        <Card.Title>Class {item.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            {
                                item.group == 'Sci' ? (
                                <div>
                                    Science
                                </div>
                                ) : item.group == 'Bus' ? (
                                    <div>
                                        Business
                                    </div>
                                ) : item.group == 'Hum' ? (
                                    <div>
                                        Humanities
                                    </div>
                                ) : (
                                    <div>

                                    </div>
                                )
                            }
                        </Card.Subtitle>
                        <br/>
                        
                        <h6>Class Teacher {item.class_teacher} </h6>
                        <Link to="#">
                            <Button
                                variant="outlined"
                                color="primary"
                                style={{
                                    float: "right",
                                    marginBottom: "10px",
                                }}
                            >
                                Enter
                            </Button>
                        </Link>
                    </Card.Body>
                </Card>
                <br />
                <br />
            </div>
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
                            {Object.keys(classes).length > 0 ? (
                                <div>
                                    {classCards}
                                </div>
                            ) : (
                                <div>hello</div>
                            )}
                        </Container>
                    </Jumbotron>
                </Col>
            </Row>
        </div>
    );
};

export default Classes;
