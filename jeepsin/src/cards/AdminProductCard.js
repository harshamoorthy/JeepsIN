import React from 'react';
import './Productcard.css'; 
import { Card, Button} from 'react-bootstrap';
import './Productcard.css'; 


const ProductCard = ({ product, onEditClick, onDeleteClick}) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img className="product-img" variant="top" src={product.image} alt={product.product_name} />
      <Card.Body>
        <Card.Title>{product.product_name}</Card.Title>
        <Card.Text>
          Price: ${product.price}
        </Card.Text>
        <Button className="product-btn" variant="primary" onClick={onEditClick}>Edit</Button>
        <br></br>
        <Button className="product-btn" variant="primary" onClick={onDeleteClick}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
