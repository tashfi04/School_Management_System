import React, { Component } from 'react'
import { Container, Row, Col,Image } from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Profile.scss";

export default class TeacherShow extends Component {
    render() 
    {
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
                            <Image style={{height:'75%', width:'75%'}} src={`http://localhost:8000${this.props.data.photo}` } thumbnail/>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                      <Col>
                        <h6>
                          <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "university"]}
                          />{" "}
                          Designation:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder={this.props.data.designation}
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
                            icon={["fas", "envelope"]}
                          />{" "}
                          Email:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder={this.props.data.email}
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
                            icon={["fas", "fax"]}
                          />{" "}
                          Fax:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                         type="text"
                          placeholder= {this.props.data.fax}
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
                          Telephone:{" "}
                        </h6>
                      </Col>
                      <Col>
                        <Form.Control
                         type="text"
                          placeholder= {this.props.data.office_telephone}
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
                  </div>
                </div>
            </Container>
          );
    }
}
