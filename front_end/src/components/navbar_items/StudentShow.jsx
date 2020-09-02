import React, { Component } from 'react'
import { Col,Row,Image } from 'react-bootstrap'

export default class StudentShow extends Component {
    render() {
        return (
            <div>
                <Row >
                    <Col sm={8}>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Name
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.name}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Class
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.current_class}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Religion
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.religion}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Father's Name
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.father_name}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Mother's Name
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.mother_name}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Guardian's Name
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.guardian_name}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Nationality
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.nationality}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Date of Birth
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.date_of_birth}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Joining Date
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.date}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Previous School
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.previous_school}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                TC Number
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.tc_number}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Contact Number
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.telephone}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Emergency Contact Number
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.emergency_telephone}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Email Address
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.email}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Present Address
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.present_address}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Permanent_address
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.permanent_address}
                            </Col>
                        </Row>


                    </Col>
                    <Col sm={4}>
                        <Image className="pt-6" src={`http://localhost:8000${this.props.data.photo}` } thumbnail float="left"/>
                        <h3 className="pt-3 float-left" > {this.props.data.username} </h3>
                    </Col>
                </Row>
            </div>
        )
    }
}
