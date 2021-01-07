import React, { Component } from 'react'
import { Jumbotron, Container, Row, Col} from 'react-bootstrap'
import Sidebar from './Sidebar'
import StudentShow from './StudentShow'
import TeacherShow from './TeacherShow'

import "./Profile.scss"

const axios = require('axios')


export default class Profile extends Component {

    render() {
            return (
                <div style={{backgroundColor:"#B8B8B8"}}>
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
                                <h1 className="pt-4">Account Information</h1> <br></br>
                                    {localStorage.getItem('role') == '4' ? (
                                        <StudentShow/>
                                    ) : (
                                        <TeacherShow/>
                                    )}
                                </Container>
                            </Jumbotron>
                        </Col>
                    </Row>
                </div>
            )
        }
}
