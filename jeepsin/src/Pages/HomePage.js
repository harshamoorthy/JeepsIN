import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../cards/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch("http://localhost:8000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Homepage</h2>
      <Row className="gx-4">
        {products.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} className="m-3"/>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
