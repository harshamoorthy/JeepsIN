import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CheckoutForm = () => {
  const location = useLocation();
  const { products, subtotal } = location.state || {};
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
    products: products || [],
    subtotal: subtotal || 0,
  });
  const [formErrors, setFormErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingID, setTrackingID] = useState('');

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

  const renderOrderReceipt = () => {
    return (
      <div>
        {/* <h5>Order Details</h5> */}
        {formData.products.map((product, index) => (
          <div key={index} className="mb-3">
            <p>
              {product.title} x {product.quantity} - ${product.price * product.quantity}
            </p>
          </div>
        ))}
        <hr />
        <p>Total: ${formData.subtotal}</p>
      </div>
    );
  };

  const renderShipmentDetails = () => {
    const fullName = `${formData.firstName} ${formData.lastName}`;
    const fullAddress = `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`;

    return (
      <div>
        <p>Full Name: {fullName}</p>
        <p>Address: {fullAddress}</p>
      </div>
    );
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     // Handle form submission
  //     console.log(formData);
  //     // Simulate order placement success
  //     setOrderPlaced(true);
  //   }
  // };
  

  // Update the handleSubmit function to send order details to the backend
const handleSubmit = async (e) => {
 e.preventDefault();
  if (validateForm()) {
    try {

      // Generate order number (OD-12345) and tracking ID (JP-12345)
      const orderNumber = `OD-${Math.floor(10000 + Math.random() * 90000)}`;
      const trackingID = `JP-${Math.floor(10000 + Math.random() * 90000)}`;

      // Set the generated order number and tracking ID
      setOrderNumber(orderNumber);
      setTrackingID(trackingID);
      // Create a new object with order details
      const orderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        products: formData.products,
        subtotal: formData.subtotal,
        orderNumber: orderNumber,
        trackingID: trackingID,
        
      };

      // Insert order details and order summary into the database
      const response = await fetch(`http://localhost:8000/api/place_order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (response.ok) {
        // If order placement is successful, display success message
        setOrderPlaced(true);
      } else {
        // If there's an error, display error message
        console.error("Error placing order:", data.error);
        // Handle error display here
      }
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error display here
    }
  }
};


  const renderOrderSummary = () => {
    return (
      <div className="order-summary">
        <h4 className="order-summary__title">Order Summary</h4>
        <div className="order-summary__items">
          {formData.products.map((product) => (
            <div key={product.id} className="order-summary__item">
              <div className="order-summary__item-image">
                <img src={product.imageUrl} alt={product.title} />
              </div>
              <div className="order-summary__item-details">
                <h5 className="order-summary__item-title">{product.title}</h5>
                <p className="order-summary__item-quantity">
                  Quantity: {product.quantity}
                </p>
                <p className="order-summary__item-price">
                  Price: ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="order-summary__total">
          <p>Total: ${formData.subtotal}</p>
        </div>
      </div>
    );
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
        <Col md={7}>

        {!orderPlaced && (        

          <Form onSubmit={handleSubmit} className="p-4 border rounded">
            {renderOrderSummary()}
            <h2 className="mb-4 text-center" style={{ marginTop: '20px' }}>Checkout</h2>
            
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
           
               
            <div className="d-flex justify-content-center" style={buttonsDivStyles}>
              
              <Link to="/" className="btn btn-secondary mr-2">
                  Continue Shopping
                </Link>
              <Button variant="primary" type="submit" className="custom-btn-primary">
                Place Order
              </Button>
            </div>
          </Form>
         
        )}
          {orderPlaced && !Object.keys(formErrors).length && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center">
                  <div style={{ 
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: '#28a745',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '1rem',
                    }}
                  >
                    <i className="fas fa-check" style={{ color: 'white', fontSize: '1.5rem' }}></i>
                  </div>
                  <h3>Your order has been placed successfully!</h3>
                </div>
              </div>
              <Row>
                <Col md={6}>
                  <div className="order-receipt border p-4 mb-4">
                    <h4>Order Receipt</h4>
                    {renderOrderReceipt()}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="shipment-details border p-4 mb-4">
                    <h4>Shipment Details</h4>
                    <p>Order Number: {orderNumber}</p>
                    <p>Tracking ID: {trackingID}</p>
                    {renderShipmentDetails()}
                  </div>
                </Col>
              </Row>
              <div className="text-center mb-4">
                <p>Thanking you for choosing JeepsIN</p>
              </div>
              <div className="text-center mt-3">
                <Link to="/" className="btn btn-primary" style={{ margin: '30px' }}>
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