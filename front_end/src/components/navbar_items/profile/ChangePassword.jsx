import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import ShowToast from './../../ShowToast'


const axios = require("axios");

function ChangePassword() {
    const [show, setShow] = useState(false);
    const [oldP, setOldP] = useState('');
    const [newP1, setNewP1] = useState('');
    const [newP2, setNewP2] = useState('');
    const [mssg, setmssg] = useState('');
    const [success, setSuccess] = useState(false);
    const [toast, setToast] = useState(false);

    const modalShow = () => {
        setShow(!show);
        setmssg();
        setSuccess(true);
    }

    const changePass = () => {
        let data = {
            old_password: oldP,
            new_password1: newP1,
            new_password2: newP2
        }
    
        let config = {
            headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
        let endpoint = '/api/v1/accounts/password/change/';
        let body = JSON.stringify(data);
        axios
        .post(endpoint,body,config)
        .then((response) => {
            modalShow();
            setToast(true);
        })
        .catch((error) => {
            setmssg('Invalid Credentials!')
            setSuccess(false);
        })
    }

    return (
        <div style={{ float: "right" }} className="pb-5">

            {
                toast ? (
                    <ShowToast mssg={'Password Changed!'} color="green" setErrors={setmssg}/>
                ) : (<></>)
            }

            <Button size="sm" variant="success" onClick={modalShow}>
                Change Password
            </Button>

            <Modal show={show} onHide={modalShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Changing Password!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                        type="password" 
                        placeholder="Old Password"
                        onChange={(e) => {setOldP(e.target.value)}} 
                    />
                    <br />
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password" 
                        placeholder="New Password"
                        onChange={(e) => {setNewP1(e.target.value)}}  
                    />
                    <br />
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Confirm New Password"
                        onChange={(e) => {setNewP2(e.target.value)}}  
                    />
                     {!success ? (<><p style={{color:'red'}}>{mssg}</p></>):(<></>)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" size="sm" onClick={modalShow}>
                        Cancel
                    </Button>
                    <Button variant="success" size="sm" onClick={changePass}>
                        Change
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ChangePassword;
