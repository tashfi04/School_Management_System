import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import ShowToast from "./../ShowToast";

const axios = require("axios");

function ResetPassword() {
    const [newPassword1, setNewPassword1] = useState();
    const [newPassword2, setNewPassword2] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const uid = useParams().uid;
    const token = useParams().token;

    const changePassword = () => {
        if (newPassword1 !== newPassword2) {
            setError("Invalid credentials!");
        } else {
            let config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            let data = {
                new_password1: newPassword1,
                new_password2: newPassword2,
                uid: uid,
                token: token,
            };

            let body = JSON.stringify(data);
            let endpoint = "/api/v1/accounts/password/reset/confirm/";

            axios
                .post(endpoint, body, config)
                .then((response) => {
                    setSuccess("Password Reset successful! You may login now!");
                })
                .catch((error) => {
                    setError("Invalid credentials!");
                });
        }
    };

    return (
        <div>
            <Container style={{ margin: "auto" }}>
                <Card
                    className="pt-5 mt-5 pb-5 mb-5"
                    style={{ maxWidth: "500px", margin: "auto" }}
                >
                    <Card.Body>
                        <Card.Title>Change Your Password</Card.Title>
                        <br />
                        <Form>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                onChange={(e) => {
                                    setNewPassword1(e.target.value);
                                }}
                            />
                            <br />
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(e) => {
                                    setNewPassword2(e.target.value);
                                }}
                            />
                        </Form>

                        {error ? (
                            <p
                                style={{ color: "red", margin: "auto" }}
                                className="pt-3"
                            >
                                {error}
                            </p>
                        ) : (
                            <></>
                        )}

                        {success ? (
                            <p
                                style={{ color: "green", margin: "auto" }}
                                className="pt-3"
                            >
                                {success}
                            </p>
                        ) : (
                            <></>
                        )}

                        {!success ? (
                            <Button
                                variant="success"
                                style={{ float: "right" }}
                                size="sm"
                                className="mt-4"
                                onClick={changePassword}
                            >
                                Change Password
                            </Button>
                        ) : (
                            <Link to='/'>
                                <Button
                                    variant="success"
                                    style={{ float: "right" }}
                                    size="sm"
                                    className="mt-4"
                                >
                                    Login
                                </Button>
                            </Link>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default ResetPassword;
