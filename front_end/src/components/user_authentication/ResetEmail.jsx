import React, { useEffect, useState } from "react";
import { Modal,Form,Button } from "react-bootstrap";
import ShowToast from './../ShowToast'

const axios = require('axios')

function ResetEmail() {
    const [show, setShow] = useState(true);
    const [email, setEmail] = useState();
    const [errors, setErrors] = useState();
    const [send, setSend] = useState(true);

    const showModal = () => {
        setShow(!show);
        setEmail();
        setSend(true);
    };

    const sendMail = () => {

        let data = {
            'email': email
        }

        let endpoint = '/api/v1/accounts/password/reset/';
        let body = JSON.stringify(data);
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        axios
        .post(endpoint,body,config)
        .then((response) => {
            setErrors('Check your email!');
            showModal();
        })
        .catch((error) => {
            setSend(false);
        })
    }

    return (
        <div>
            {
                errors ? (
                    <ShowToast
                        mssg={errors}
                        color="green"
                        setErrors={setErrors}
                    />
                ) : (
                    <></>
                )
            }
            <Modal show={show} onHide={showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter your email.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        onChange = {(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    {!setSend ? (
                        <p style={{color:'red'}}>Something went wrong</p>
                    ) : (
                        <></>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" size='sm' onClick={showModal}>
                        Close
                    </Button>
                    <Button variant="success" size='sm' onClick={sendMail}>
                        Send Email
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ResetEmail;
