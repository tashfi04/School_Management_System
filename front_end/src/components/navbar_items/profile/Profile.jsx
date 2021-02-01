import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import StudentShow from "./StudentShow";
import TeacherShow from "./TeacherShow";

// const axios = require('axios')

export default class Profile extends Component {
    render() {
        return (
            <Container style={{ margin: "auto"}}>
                <Row>
                    <Col sm={3} md={3} className='pt-5'>
                        <Container style={{border:'solid', borderColor:'#ebebeb'}}>
                            <Sidebar />
                        </Container>
                    </Col>
                    <Col sm={9} md={9}>
                        <Container style={{backgroundColor: "#ebebeb"}}>
                            <h1 style={{borderLeft: 'solid', borderLeftColor:'#555573', borderLeftWidth:'7px'}} className="pt-4 pl-4">Account Information</h1>{" "}
                            <br></br>
                            {localStorage.getItem("role") === "4" ? (
                                <StudentShow />
                            ) : (
                                <TeacherShow />
                            )}
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}
