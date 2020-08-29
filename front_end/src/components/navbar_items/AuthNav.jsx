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
                <NavDropdown title="Action Bar" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/profile">{localStorage.getItem('username')}</NavDropdown.Item>
                    <NavDropdown.Item href="#">Action 1</NavDropdown.Item>
                    <NavDropdown.Item href="#">Actions 2</NavDropdown.Item>
                <NavDropdown.Divider />
                    <NavDropdown.Item href="/logout">Logout <img src="assets/login.png" width="25px" float="right" /> </NavDropdown.Item>
                </NavDropdown>
            </Navbar.Collapse>
        </Navbar>
        </div>
    )
}

export default UnauthNav
