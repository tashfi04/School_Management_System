import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./Login.css";

const axios = require("axios");

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            logged_in: false,
        };
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
                localStorage.setItem("token", json.data.token);
                localStorage.setItem("username", json.data.user.username);
                this.setState({
                    username: json.data.user.username,
                    logged_in: true,
                });
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        if (this.state.logged_in) return <Redirect to={{ pathname: "/" }} />;
        else {
            return (
                <div
                    style={{
                        backgroundColor: "#D8D7D7",
                        height: "100vh",
                        weidth: "100vw",
                        alignContent: "center",
                        display:"flex",
                        alignItems: "center"
                    }}
                >
                    <Container style={{margin: "auto"}}>
                        <Form
                            onSubmit={(e) => this.handle_login(e, this.state)}
                        >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>
                                  <h4>
                                    User Name:
                                  </h4>
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
                                <h4>
                                    Password:
                                  </h4>
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
                    </Container>
                </div>
            );
        }
    }
}
