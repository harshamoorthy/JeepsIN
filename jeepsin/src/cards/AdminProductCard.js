import React from 'react';
import { Card, Button} from 'react-bootstrap';

const ProductCard = ({ product, onEditClick, onDeleteClick}) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image} alt={product.product_name} />
      <Card.Body>
        <Card.Title>{product.product_name}</Card.Title>
        <Card.Text>
          Price: ${product.price}
        </Card.Text>
        <Button variant="primary" onClick={onEditClick}>Edit</Button>
        <Button variant="primary" onClick={onDeleteClick}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
