import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavbarComponent = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">JeepsIN</Navbar.Brand>

        {/* Collapse button for small screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            {/* Add more Nav.Link components for additional links */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}

export default NavbarComponent;