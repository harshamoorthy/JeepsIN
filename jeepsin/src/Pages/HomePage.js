import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
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

  // Demo carousel items
  const carouselItems = [
    {
      id: 1,
      image: "https://blog.vipautoaccessories.com/wp-content/uploads/2020/11/10K-Wrangler-Hero-1140x570.png",
      title: "Off-Road Adventure",
      caption: "Explore rugged terrains with our durable jeep accessories."
    },
    {
      id: 2,
      image: "https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2020/10/wrangler-off-road.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5",
      title: "Conquer Any Terrain",
      caption: "Equip your jeep with the best off-roading gear available."
    },
    {
      id: 3,
      image: "https://i.ytimg.com/vi/IxarAxXUDhc/maxresdefault.jpg",
      title: "Off-Road Essentials",
      caption: "Discover must-have accessories for your next off-road expedition."
    }
  ];

  return (
    <Container className="mt-4 mb-5">
      <Carousel className="Carousel">
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              className="d-block w-100 overlay"
              src={item.image}
              alt={item.title}
            />
            <Carousel.Caption>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <h2 className="mb-2 mt-4">Latest products</h2>

      <Row className="gx-4 mt-4">
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
