import React, { Component } from 'react'
import { Jumbotron, Container,Col,Row,Image } from 'react-bootstrap'
import './Profile.css'

const axios = require('axios')


export default class Profile extends Component {

   constructor(props) {
       super(props)

       this.state = {
           username : localStorage.getItem('username'),
           data: []
       }
   }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/profile/', {
            params: {
                username : localStorage.getItem('username')
            }
        })
        .then(response => {
            console.log(response.data[0])
            this.setState({data: response.data[0]})
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <Container>
                    <h1 className="pt-4">Account Information</h1> <br></br>
                        <Row >
                            <Col sm={8}>
                                <Row className="pt-3">
                                    <Col sm={4}>
                                        Name
                                    </Col>
                                    <Col sm={4}>
                                        : {this.state.data.name}
                                    </Col>
                                </Row>
                                <Row className="pt-3">
                                    <Col sm={4}>
                                        Class
                                    </Col>
                                    <Col sm={4}>
                                        : {this.state.data.current_class}
                                    </Col>
                                </Row>
                                <Row className="pt-3">
                                    <Col sm={4}>
                                        Religion
                                    </Col>
                                    <Col sm={4}>
                                        : {this.state.data.religion}
                                    </Col>
                                </Row>
                                <Row className="pt-3">
                                    <Col sm={4}>
                                        Father's Name
                                    </Col>
                                    <Col sm={4}>
                                        : {this.state.data.father_name}
                                    </Col>
                                </Row>
                                <Row className="pt-3">
                                    <Col sm={4}>
                                        Mother's Name
                                    </Col>
                                    <Col sm={4}>
                                        : {this.state.data.mother_name}
                                    </Col>
                                </Row>
                                <Row className="pt-3">
                                    <Col sm={4}>
                                        Guardian's Name
                                    </Col>
                                    <Col sm={4}>
                                        : {this.state.data.guardian_name}
                                    </Col>
                                </Row>
                                <Row className="pt-3">
                                    <Col sm={4}>
                                        Nationality
                                    </Col>
                                    <Col sm={4}>
                                        : {this.state.data.nationality}
                                    </Col>
                                </Row>
                                <Row className="pt-3">
                                    <Col sm={4}>
                                        Date of Birth
                                    </Col>
                                    <Col sm={4}>
                                        : {this.state.data.date_of_birth}
                                    </Col>
                                </Row>
                                <Row className="pt-3">
                                    <Col sm={4}>
                                        Joining Date
                                    </Col>
                                    <Col sm={4}>
                                        : {this.state.data.date}
                                    </Col>
                                </Row>
                                <Row className="pt-3">
                                    <Col sm={4}>
                                        Previous School
                                    </Col>
                                    <Col sm={4}>
                                        : {this.state.data.previous_school}
                                    </Col>
                                </Row>
                                <Row className="pt-3">
                                    <Col sm={4}>
                                        TC Number
                                    </Col>
                                    <Col sm={4}>
                                        : {this.state.data.tc_number}
                                    </Col>
                                </Row>
                                <Row className="pt-3">
                                    <Col sm={4}>
                                        Contact Number
                                    </Col>
                                    <Col sm={4}>
                                        : {this.state.data.telephone}
                                    </Col>
                                </Row>
                                <Row className="pt-3">
                                    <Col sm={4}>
                                        Emergency Contact Number
                                    </Col>
                                    <Col sm={4}>
                                        : {this.state.data.emergency_telephone}
                                    </Col>
                                </Row>
                                <Row className="pt-3">
                                    <Col sm={4}>
                                        Email Address
                                    </Col>
                                    <Col sm={4}>
                                        : {this.state.data.email}
                                    </Col>
                                </Row>
                                <Row className="pt-3">
                                    <Col sm={4}>
                                        Present Address
                                    </Col>
                                    <Col sm={4}>
                                        : {this.state.data.present_address}
                                    </Col>
                                </Row>
                                <Row className="pt-3">
                                    <Col sm={4}>
                                        Permanent_address
                                    </Col>
                                    <Col sm={4}>
                                        : {this.state.data.permanent_address}
                                    </Col>
                                </Row>


                            </Col>
                            <Col sm={4}>
                                <Image className="pt-6" src={`http://localhost:8000${this.state.data.photo}` } thumbnail float="left"/>
                                <h3 className="pt-3 float-left" > {this.state.data.username} </h3>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}
