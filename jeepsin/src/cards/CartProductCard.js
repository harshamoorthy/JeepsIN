import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const CartProductCard = ({ product, onQuantityChange, onRemoveProduct }) => {
  const handleQuantityChange = (e) => {
    onQuantityChange(product.id, e.target.value);
  };

  const handleRemove = () => {
    onRemoveProduct(product.id);
  };

  return (
    <Card className="mb-3 d-flex flex-row">
      <Card.Img variant="top" className="w-25 object-fit-cover " src={product.imageUrl} alt={product.title} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>Price: ${product.price}</Card.Text>
        <Form>
          <Form.Group controlId={`quantity-${product.id}`}>
            <Form.Label>Quantity</Form.Label>
            <Form.Control as="select" value={product.quantity} onChange={handleQuantityChange}>
              {[...Array(10).keys()].map(x => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
        <Button variant="danger" onClick={handleRemove} className='mt-2'>Remove</Button>
        <Card.Text>Total: ${product.price * product.quantity}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CartProductCard;
