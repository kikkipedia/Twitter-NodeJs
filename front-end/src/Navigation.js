import React from 'react'
import {Navbar, Nav} from "react-bootstrap"

export default class Navigation extends React.Component {


    render() {
        return(
            <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">FakeTwitter</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/tweets">Tweet</Nav.Link>
                </Nav>
            </Navbar>
            </>
        )
    }
}