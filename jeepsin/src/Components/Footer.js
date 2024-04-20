import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>JeepsIN</h5>
            <p>Drive in style</p>
          </Col>
          <Col md={3}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/return_product">Returns</a></li>
              <li><a href="/cart">Cart</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Social Media</h5>
            <ul className="list-unstyled">
              <li><a href="">Facebook</a></li>
              <li><a href="">Twitter</a></li>
              <li><a href="">Instagram</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="text-center mt-3">
        <p>&copy; 2024 JeepsIN. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
