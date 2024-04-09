import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import CartProductCard from '../cards/CartProductCard';
import { Link } from "react-router-dom";


class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchCartData();
  }

  fetchCartData() {
    fetch('http://localhost:8000/api/cart') // Adjust this URL to your API endpoint
        .then(response => response.json())
        .then(cartData => {
            if (!cartData || !cartData.updatedCart || !cartData.updatedCart.products) {
                console.error('No cart data found');
                this.setState({ products: [], loading: false });
                return;
            }

            // Assuming cartData directly contains the products or is the array of cart items
            const productsInCart = cartData.updatedCart ? cartData.updatedCart.products : cartData.products;

            // Fetch details for each product
            const productFetchPromises = productsInCart.map(product =>
                fetch(`http://localhost:8000/api/products/${product.productId}`)
                    .then(response => response.json())
                    .then(productDetails => ({
                        ...productDetails, // Assume this has price and other details
                        quantity: product.quantity,
                    }))
            );

            Promise.all(productFetchPromises)
                .then(products => this.setState({ products, loading: false }))
                .catch(error => {
                    console.error('Error fetching product details:', error);
                    this.setState({ loading: false });
                });
        })
        .catch(error => {
            console.error('Error fetching cart data:', error);
            this.setState({ loading: false });
        });
}



  handleQuantityChange = (productId, quantity) => {
    this.setState(prevState => ({
      products: prevState.products.map(product =>
        product.productId === productId ? { ...product, quantity: parseInt(quantity, 10) } : product
      ),
    }));
  };

  handleRemoveProduct = (productId) => {
    console.log(productId);
    fetch(`http://localhost:8000/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())  // Ensure the backend sends a JSON response
    .then(data => {
        if (data.success) {
            this.setState(prevState => ({
                // Filter out the product that has been deleted
                products: prevState.products.filter(product => product.productId !== productId),
            }));
        } else {
            // Log or display an error message if the operation was not successful
            console.error('Error removing product from cart:', data.message);
        }
        this.fetchCartData()
    })
    .catch(error => {
        console.error('Error removing product from cart:', error);
    });
};

  

  calculateSubtotal = () => {
    return this.state.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  };

  render() {
    const { products, loading } = this.state;
    const subtotal = this.calculateSubtotal();

    if (loading) {
      return <Container><div>Loading cart...</div></Container>;
    }

    return (
      <Container>
        <h1 className='mt-5'>Cart</h1>
        <hr></hr>
        <Row>
          <div className='col-12 col-sm-8'>
            {products.map((product, index) => (
              <CartProductCard
                key={index}
                product={product}
                onQuantityChange={this.handleQuantityChange}
                onRemoveProduct={this.handleRemoveProduct}
              />
            ))}
          </div>
          <div className='col-12 col-sm-4'>
            <h4>Price Details</h4>
            <p>Subtotal: ${subtotal}</p>
            <Link to="/checkout">
            <Button variant="primary">Proceed to Checkout</Button>
            </Link>
          </div>
        </Row>
      </Container>
    );
  }
}

export default CartPage;
