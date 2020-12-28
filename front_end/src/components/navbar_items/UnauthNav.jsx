import React from 'react'
import {Navbar, Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Unauth.css'

function UnauthNav() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed = "top">
            <Navbar.Brand href="/">Shahjalal University School</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/administration">Administration</Nav.Link>
                <Nav.Link href="/academic/overview">Academic</Nav.Link>
                <Nav.Link href="/facilities">Facilities</Nav.Link>
                <Nav.Link href="/notice">Notice</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                <Nav.Link href="/login">
                <FontAwesomeIcon
                    className="fa-icon"
                    icon={["fas", "sign-in-alt"]}
                />{"  "}
                    Login
                </Nav.Link>
                </Nav>                     
            </Navbar.Collapse>
        </Navbar>
        </div>
    )
}

export default UnauthNav
