import React, { Component } from "react";
import { Form, Button, Container, Image, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./Login.css";
import ShowToast from "./../ShowToast";

const axios = require("axios");

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            logged_in: false,
            errors: "",
        };
    }

    setErrors = () => {
        this.setState({
            errors:''
        });
    }

    handle_change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState((prevstate) => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    };

    handle_login = (e, data) => {
        e.preventDefault();
        let endpoint = "/token-auth/";
        let body = JSON.stringify(data);
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        axios
            .post(endpoint, body, config)
            .then((json) => {
                console.log(json.data);
                localStorage.setItem("token", json.data.token);
                localStorage.setItem("username", json.data.user.username);
                localStorage.setItem("role", json.data.user.role);
                this.setState({
                    username: json.data.user.username,
                    logged_in: true,
                });
                window.location.reload(false);
            })
            .catch((err) => {
                console.table(err);
                this.setState({
                    errors: "Invalid Credentials!",
                });
            });
    };
    // backgroundColor: "#D8D7D7",
    render() {
        if (this.state.logged_in) return <Redirect to={{ pathname: "/" }} />;
        else {
            return (
                <Row style={{ backgroundColor: "#D8D7D7" }}>
                    <Col sm={8} md={8} lg={8}>
                        <Image
                            src="../../assets/login.jpg"
                            style={{width:'100%', height:'100%'}}
                        ></Image>
                    </Col>
                    <Col sm={4} md={4} lg={4}>
                        <div
                            style={{
                                backgroundColor: "#D8D7D7",
                                alignContent: "center",
                                marginTop: "30vh",
                                marginBottom: "0vh",
                                alignItems: "center",
                            }}
                        >
                            <Container>
                                <Form
                                    onSubmit={(e) =>
                                        this.handle_login(e, this.state)
                                    }
                                >
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>
                                            <h4>User Name:</h4>
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="User Name"
                                            name="username"
                                            onChange={this.handle_change}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>
                                            <h4>Password:</h4>
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            onChange={this.handle_change}
                                        />
                                    </Form.Group>
                                    <br />
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                                {this.state.errors ? (
                                    <ShowToast mssg={this.state.errors} color="red" setErrors={this.setErrors}/>
                                ) : (
                                    <React.Fragment></React.Fragment>
                                )}
                            </Container>
                        </div>
                    </Col>
                </Row>
            );
        }
    }
}
