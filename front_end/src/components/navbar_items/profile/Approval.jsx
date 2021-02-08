import React from 'react'
import Sidebar from "./Sidebar";
import { useJwt } from "react-jwt";
import PageNotFound from "./../../PageNotFound/PageNotFound";
import { Row, Col, Container } from 'react-bootstrap';

const axios = require('axios');

function Approval () {
    const { decodedToken, isExpired } = useJwt(localStorage.getItem("token"));
    return(
        <div>
            {decodedToken && !isExpired && localStorage.getItem("role") === "3" ? (
                <Container style={{margin:'auto'}}>
                    <Row>
                        <Col sm={3} md={3} xl={3} className="pt-5">
                            <Container 
                            style={{
                                border: "solid",
                                borderColor: "#ebebeb",
                            }}
                            >
                                <Sidebar />
                            </Container>
                        </Col>
                        <Col sm={9} md={9}>
                            <Container style={{ backgroundColor: "#ebebeb" }}>

                            </Container>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <PageNotFound />
            )}
        </div>
    )
}

export default Approval;