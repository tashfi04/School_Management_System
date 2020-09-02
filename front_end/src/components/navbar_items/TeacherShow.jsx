import React, { Component } from 'react'
import { Col,Row,Image } from 'react-bootstrap'

export default class TeacherShow extends Component {
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
                                Designation
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.designation}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Email
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.email}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Fax
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.fax}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Telephone
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.office_telephone}
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
                                Data of Birth
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.date_of_birth}
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col sm={4}>
                                Joining Data
                            </Col>
                            <Col sm={4}>
                                : {this.props.data.date_of_join}
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
