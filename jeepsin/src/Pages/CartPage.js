import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CartProductCard from '../cards/CartProductCard';
import { Link } from 'react-router-dom';

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        { id: 1, title: 'Product 1', price: 100, quantity: 1 ,imageUrl:"https://m.media-amazon.com/images/I/81XZ-Uz2fZL._AC_UF1000,1000_QL80_.jpg"},
        { id: 2, title: 'Product 2', price: 200, quantity: 2 ,imageUrl:"https://m.media-amazon.com/images/I/81XZ-Uz2fZL._AC_UF1000,1000_QL80_.jpg"},
        { id: 3, title: 'Product 3', price: 300, quantity: 1 ,imageUrl:"https://m.media-amazon.com/images/I/81XZ-Uz2fZL._AC_UF1000,1000_QL80_.jpg"},
      ],
    };
  }

  handleQuantityChange = (productId, quantity) => {
    this.setState(prevState => ({
      products: prevState.products.map(product =>
        product.id === productId ? { ...product, quantity: parseInt(quantity, 10) } : product
      ),
    }));
  };

  handleRemoveProduct = (productId) => {
    this.setState(prevState => ({
      products: prevState.products.filter(product => product.id !== productId),
    }));
  };

  calculateSubtotal = () => {
    return this.state.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  };

  render() {
    const { products } = this.state;
    const subtotal = this.calculateSubtotal();

    return (
      <Container>
        <h1 className='mt-5'>Cart</h1>
        <hr></hr>
        <Row>
          <div className='col-12 col-sm-8'>
            {products.map(product => (
              <CartProductCard
                key={product.id}
                product={product}
                onQuantityChange={this.handleQuantityChange}
                onRemoveProduct={this.handleRemoveProduct}
              />
            ))}
          </div>
          <div className='col-12 col-sm-4'>
            <h4>Price Details</h4>
            <p>Subtotal: ${subtotal}</p>
            {/* <Button variant="primary">Proceed to Checkout</Button> */}
            <Link to="/checkout" state={{ products, subtotal }}>
    <Button variant="primary">Proceed to Checkout</Button>
  </Link>
          </div>
        </Row>
      </Container>
    );
  }
}

export default CartPage;
