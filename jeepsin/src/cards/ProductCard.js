import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './Productcard.css'; 

const ProductCard = ({ product }) => {
  return (
    <Card className="product-card mt-3">
      <Card.Img className="product-img" variant="top" src={product.image} alt={product.product_name} />
      <Card.Body>
        <Card.Title className='product-title'>{product.product_name}</Card.Title>
        <Card.Text>
          Price: ${product.price}
        </Card.Text>
        <Button variant="primary">View Details</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
