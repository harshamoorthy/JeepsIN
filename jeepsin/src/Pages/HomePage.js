import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../cards/ProductCard";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch data from the API endpoint
     const response = await axios.get("http://localhost:8000/api/products");
     
     setProducts(response?.data);
   } catch (error) {
     console.error("Error fetching data:", error);
   }
  
  }
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
