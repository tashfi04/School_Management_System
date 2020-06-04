import React from 'react'
import {Navbar, Nav, NavDropdown } from 'react-bootstrap'
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
                <Nav.Link href="/academics">Academic</Nav.Link>
                <Nav.Link href="/facilities">Facilities</Nav.Link>
                <Nav.Link href="/notice">Notice</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#">{localStorage.getItem('username')}</Nav.Link>
                    <Nav.Link href="/logout"> <img src="assets/login.png" width="25px" float="right" /> </Nav.Link>
                </Nav>     
            </Navbar.Collapse>
        </Navbar>
        </div>
    )
}

export default UnauthNav
