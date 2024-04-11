import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //resetting error state
    setError("");

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    axios.post("http://localhost:8000/login", { username, password })
      .then(response => {
        // Store the user data in local storage (optional)
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      })
      .catch(error => {
        console.log(error);
        setError("Failed to sign in. Please try again.");
      });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Login</h2>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label className="text-left">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                className="mb-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="text-left">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                className="mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <div className="d-flex justify-content-center ">
              <Button variant="primary" type="submit" className="custom-login-btn-primary" style={{ marginRight: '20px', marginBottom: '30px' }}>
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
};


export default Login;
