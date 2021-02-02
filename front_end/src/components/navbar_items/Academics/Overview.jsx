import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarAcademic from "./SidebarAcademic";
import "./../Home.css";

export default class Overview extends Component {
    render() {
        return (
            // style={{backgroundColor:"#B8B8B8"}}
            <Container style={{ margin: "auto" }}>
                <Row>
                    <Col sm={4} md={4} className='pt-5'>
                        <Container  style={{border:'solid', borderColor:'#ebebeb'}}>
                            <SidebarAcademic />
                        </Container>
                    </Col>
                    <Col sm={8} md={8} style={{backgroundColor:'#ebebeb'}}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "center",
                            }}
                            className="pb-5"
                        >
                            <h3 className="pt-4">
                                <FontAwesomeIcon
                                    className="fa-icon"
                                    icon={["fas", "school"]}
                                />{" "}
                                {"    "}
                                Overview
                            </h3>
                            <Image
                                style={{ height: "50vh" }}
                                className="d-block w-100 mb-5 mt-4"
                                src="../../assets/overview_demo.jpg"
                                fluid
                                alt="School-Front"
                            />
                            <div
                                style={{
                                    borderLeft: "solid",
                                    borderLeftColor: "#555573",
                                    borderLeftWidth: "5px",
                                }}
                                className="pl-4"
                            >
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry . Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic typesetting,
                                remaining essentially unchanged . It was
                                popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages
                                , and more recently with desktop publishing
                                software like Aldus PageMaker including versions
                                of Lorem Ipsum.
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
