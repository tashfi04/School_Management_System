import React, { Component } from 'react'
import { Container, Row, Col,Image } from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Profile.scss";

export default class StudentShow extends Component {
    render() {
        return (
            <Container fluid>
                <div>  
                  <div className="mb-3 container profile">
                    <Row>
                        <Col sm={6}>
                            <h2>
                            <FontAwesomeIcon icon={["fas", "user"]} /> {"  "}
                                {this.props.data.name}
                            </h2>
                        </Col>
                        <Col sm={6}>
                            <Image style={{height:'75%', width:'75%'}} src={`${this.props.data.photo}`} thumbnail/>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                      <Col>
                        <h6>
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "users-class"]}
                          />{" "}
                          Current Class:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder={this.props.data.current_class}
                          readOnly
                        />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <h6>
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "praying-hands"]}
                          />{" "}
                          Religion:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder={this.props.data.religion}
                          readOnly
                        />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <h6>
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "male"]}
                          />{" "}
                          Father's Name:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                         type="text"
                          placeholder= {this.props.data.father_name}
                        readOnly />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <h6>
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "female"]}
                          />{" "}
                          Mother's Name:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                         type="text"
                          placeholder= {this.props.data.mother_name}
                        readOnly />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <h6>
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "male"]}
                          />{" "}
                          Guardian's Name:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                         type="text"
                          placeholder= {this.props.data.guardian_name}
                        readOnly />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <h6>
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "globe-asia"]}
                          />{" "}
                          Nationality:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                         type="text"
                          placeholder= {this.props.data.nationality}
                        readOnly />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <h6>
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "calendar-day"]}
                          />{" "}
                          Data of Birth:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                         type="text"
                          placeholder= {this.props.data.date_of_birth}
                        readOnly />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <h6>
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "calendar-alt"]}
                          />{" "}
                          Joining Date:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                         type="text"
                          placeholder= {this.props.data.date_of_join}
                        readOnly />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <h6>
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "school"]}
                          />{" "}
                          Previous School:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                         type="text"
                          placeholder= {this.props.data.previous_school}
                        readOnly />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <h6>
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "sort-numeric-up-alt"]}
                          />{" "}
                          TC Number:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                         type="text"
                          placeholder= {this.props.data.tc_number}
                        readOnly />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <h6>
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "phone-square-alt"]}
                          />{" "}
                          Contact Number:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                         type="text"
                          placeholder= {this.props.data.telephone}
                        readOnly />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <h6>
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "phone-square-alt"]}
                          />{" "}
                          Emergency Contact Number:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                         type="text"
                          placeholder= {this.props.data.emergency_telephone}
                        readOnly />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <h6>
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "envelope"]}
                          />{" "}
                          Email Address:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                         type="text"
                          placeholder= {this.props.data.email}
                        readOnly />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <h6>
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "address-card"]}
                          />{" "}
                          Present Address:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                         type="text"
                          placeholder= {this.props.data.present_address}
                        readOnly />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <h6>
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "address-card"]}
                          />{" "}
                          Permanent Address:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                         type="text"
                          placeholder= {this.props.data.permanent_address}
                        readOnly />
                      </Col>
                    </Row>
                    <br />
                  </div>
                </div>
            </Container>
          );
    }
}
