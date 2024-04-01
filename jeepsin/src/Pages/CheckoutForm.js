import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cardHolderName: '',
    paypalEmail: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cardNumberRegex = /^[0-9]{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!formData.firstName) {
      errors.firstName = 'First name is required';
    }
    if (!formData.lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.address) {
      errors.address = 'Address is required';
    }
    if (!formData.city) {
      errors.city = 'City is required';
    }
    if (!formData.postalCode) {
      errors.postalCode = 'Postal code is required';
    }
    if (!formData.country) {
      errors.country = 'Country is required';
    }
    if (!formData.paymentMethod) {
      errors.paymentMethod = 'Payment method is required';
    }
    if (formData.paymentMethod === 'Credit Card') {
      if (!formData.cardNumber) {
        errors.cardNumber = 'Card number is required';
      } else if (!cardNumberRegex.test(formData.cardNumber)) {
        errors.cardNumber = 'Invalid card number';
      }
      if (!formData.expiryDate) {
        errors.expiryDate = 'Expiry date is required';
      } else if (!expiryDateRegex.test(formData.expiryDate)) {
        errors.expiryDate = 'Invalid expiry date format';
      }
      if (!formData.cardHolderName) {
        errors.cardHolderName = 'Card holder name is required';
      }
    } else if (formData.paymentMethod === 'PayPal') {
      if (!formData.paypalEmail) {
        errors.paypalEmail = 'PayPal email is required';
      } else if (!emailRegex.test(formData.paypalEmail)) {
        errors.paypalEmail = 'Invalid email format';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log(formData);
      // Simulate order placement success
      setOrderPlaced(true);
    }
  };

  const renderPaymentFields = () => {
    if (formData.paymentMethod === 'Credit Card') {
      return (
        <>
          <Form.Group controlId="cardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your card number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              isInvalid={!!formErrors.cardNumber}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.cardNumber}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="expiryDate">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="MM/YY"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              isInvalid={!!formErrors.expiryDate}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.expiryDate}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="cardHolderName">
            <Form.Label>Card Holder Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter card holder name"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleChange}
              isInvalid={!!formErrors.cardHolderName}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.cardHolderName}
            </Form.Control.Feedback>
          </Form.Group>
        </>
      );
    } else if (formData.paymentMethod === 'PayPal') {
      return (
        <Form.Group controlId="paypalEmail">
          <Form.Label>PayPal Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your PayPal email"
            name="paypalEmail"
            value={formData.paypalEmail}
            onChange={handleChange}
            isInvalid={!!formErrors.paypalEmail}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.paypalEmail}
          </Form.Control.Feedback>
        </Form.Group>
      );
    } else {
      return null;
    }
  };

  const successMessageStyles = {
    padding: '70px',
    fontSize: '30px',
    textAlign: 'center',
  };
  const buttonStyles = {
    margin: '30px',
  };
  const buttonsDivStyles = {
    margin: '30px 0',
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>

        {!orderPlaced && (

          <Form onSubmit={handleSubmit} className="p-4 border rounded">
            <h2 className="mb-4 text-center">Checkout</h2>
            <Row>
              <Col md={6}>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    isInvalid={!!formErrors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
                <div style={{ marginBottom: '20px' }}></div>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    isInvalid={!!formErrors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
                <div style={{ marginBottom: '20px' }}></div>
              </Col>
            </Row>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!formErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <div style={{ marginBottom: '20px' }}></div>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                isInvalid={!!formErrors.address}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.address}
              </Form.Control.Feedback>
            </Form.Group>
            <div style={{ marginBottom: '20px' }}></div>
            <Row>
              <Col md={6}>
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    isInvalid={!!formErrors.city}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.city}
                  </Form.Control.Feedback>
                </Form.Group>
                <div style={{ marginBottom: '20px' }}></div>
              </Col>
              <Col md={6}>
                <Form.Group controlId="postalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your postal code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    isInvalid={!!formErrors.postalCode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.postalCode}
                  </Form.Control.Feedback>
                </Form.Group>
                <div style={{ marginBottom: '20px' }}></div>
              </Col>
            </Row>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                isInvalid={!!formErrors.country}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.country}
              </Form.Control.Feedback>
            </Form.Group>
            <div style={{ marginBottom: '20px' }}></div>
            <Form.Group controlId="paymentMethod">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control
                as="select"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                isInvalid={!!formErrors.paymentMethod}
              >
                <option value="">Select Payment Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formErrors.paymentMethod}
              </Form.Control.Feedback>
            </Form.Group>
            <div style={{ marginBottom: '20px' }}></div>
            {renderPaymentFields()}
            <div className="d-flex justify-content-between" style={buttonsDivStyles}>
              
              <Link to="/" className="btn btn-secondary">
                  Continue Shopping
                </Link>
              <Button variant="primary" type="submit">
                Place Order
              </Button>
            </div>
          </Form>
        )}
          {orderPlaced && !Object.keys(formErrors).length && (
            <div>
            <div
              role="alert"
              className="fade mt-3 alert alert-success show"
              style={successMessageStyles}>
              Your order has been placed successfully!
            </div>
            <div className="text-center mt-3">
              <Link to="/" className="btn btn-primary" style={buttonStyles}>
                Continue Shopping
              </Link>
            </div>
          </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutForm;