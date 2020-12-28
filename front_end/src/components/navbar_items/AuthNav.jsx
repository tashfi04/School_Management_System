import React from 'react'
import {Navbar, Nav , DropdownButton, Dropdown} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './AuthNav.css'

function AuthNav() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed = "top">
            <Navbar.Brand href="/">Shahjalal University School</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/administration">Administration</Nav.Link>
                <Nav.Link href="/academics/overview">Academic</Nav.Link>
                <Nav.Link href="/facilities">Facilities</Nav.Link>
                <Nav.Link href="/notice">Notice</Nav.Link>
                </Nav>    
                <DropdownButton
                    title="Options"
                    menuAlign="right"
                    id="dropdown-menu-align-right"
                    variant="secondary"
                >
                    <Dropdown.Item href="/profile">
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "user-circle"]}
                        />{"  "}
                        {localStorage.getItem('username')}
                    </Dropdown.Item>
                    <Dropdown.Item href="#">Actions 2</Dropdown.Item>
                    <Dropdown.Item href="#">Actions 3</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/logout">
                        <FontAwesomeIcon
                            className="fa-icon"
                            icon={["fas", "sign-out-alt"]}
                        />{" "}
                           Logout 
                    </Dropdown.Item>
                </DropdownButton>
            </Navbar.Collapse>
        </Navbar>
        </div>
    )
}

export default AuthNav
