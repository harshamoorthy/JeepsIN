import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import CartProductCard from '../cards/CartProductCard';

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
            // Flatten the products array and remove duplicates
            const allProducts = cartData.reduce((acc, cartEntry) => {
                cartEntry.updatedCart.products.forEach(product => {
                    if (!acc.some(p => p.productId === product.productId)) {
                        acc.push(product);
                    }
                });
                return acc;
            }, []);

            // Fetch details for each product
            const productFetchPromises = allProducts.map(product =>
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
    this.setState(prevState => ({
      products: prevState.products.filter(product => product.productId !== productId),
    }));
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
            <Button variant="primary">Proceed to Checkout</Button>
          </div>
        </Row>
      </Container>
    );
  }
}

export default CartPage;
