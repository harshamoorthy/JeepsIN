import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Login = () => {
  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Login</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label className="text-left">Username</Form.Label>
              <Form.Control type="text" placeholder="Enter your username" className="mb-3" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text-left">Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" className="mb-3"/>
            </Form.Group>
            <div className="d-flex justify-content-center ">

            <Button variant="primary" type="submit" style={{ marginRight: '20px', marginBottom: '30px' }}>
              Login
            </Button>

            <Button variant="secondary" href="/" style={{ marginBottom: '30px' }}>
              Cancel
            </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
