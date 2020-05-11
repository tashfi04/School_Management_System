import React, { Component } from 'react'
import {Navbar, Nav, NavDropdown } from 'react-bootstrap'
import './CustomNavbar.css'

export default class CustomNavbar extends Component {
    render() {
        return (
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

                        <Nav className="ml-auto">
                        <Nav.Link href="/login"> <img src="assets/login.png" width="25px" float="right" /> </Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
        )
    }
}
