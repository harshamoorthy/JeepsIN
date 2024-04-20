import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CartProductCard from '../cards/CartProductCard';
import { Link } from 'react-router-dom';

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        { id: 1, title: 'Center High-Mount Stop Light (CHMSL) Relocation Kit - Mopar', price: 79, quantity: 1 ,imageUrl:"https://s3.amazonaws.com/rp-part-images/assets/74a526c92119977e5c752cd83cc3ba09.webp"},
        { id: 2, title: 'snakes themed jeeps', price: 55, quantity: 2 ,imageUrl:"https://images.pexels.com/photos/1682666/pexels-photo-1682666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"},
        { id: 3, title: 'RUGCEL WINCH 12000lb Waterproof Electric', price: 400, quantity: 1 ,imageUrl:"https://m.media-amazon.com/images/I/61jhbdd9iJL._AC_SX425_.jpg"},
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
