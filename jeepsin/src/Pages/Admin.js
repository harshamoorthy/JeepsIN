import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import AdminProductCard from "../cards/AdminProductCard";
import { Link } from "react-router-dom";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);

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

  const handleEditProduct = async (productId) => {
    setEditingProductId(productId);
    // Fetch product details to pre-fill the form
    const product = products.find((product) => product._id === productId);
    if (product) {
      setProductName(product.product_name);
      setPrice(product.price);
      setImage(product.image);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/delete_product/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        //flitering products after deletion
        setProducts(products.filter((product) => product._id !== productId));
        console.log("Product deleted successfully");
      } else {
        console.error("Error deleting product:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };


  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/edit_product/${editingProductId}`,{
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_name: productName,
            price: price,
            image: image,
          }),
        }
      );
      if (response.ok) {
        // Update products state to reflect the edited product
        const editedProduct = await response.json();
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editingProductId ? editedProduct : product
          )
        );
        // Clear the form and editing state
        setEditingProductId(null);
        setProductName("");
        setPrice("");
        setImage("");
        console.log("Product edited successfully");
      } else {
        console.error("Error editing product:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Admin Panel</h2>
      <br /><br />
      <h4>Want to add a new product ? </h4>
      <Link to="/add_products">
      <Button variant="primary" className="mt-3">Add New Product</Button>
      </Link>
      <br /><br />
      {/* Display existing products */}
      <Row className="gx-4">
        {products.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
            <AdminProductCard
              product={product}
              className="m-3"
              onEditClick={() => handleEditProduct(product._id)}
              onDeleteClick={() => handleDeleteProduct(product._id)}
            />
          </Col>
        ))}
      </Row>
      {/* Display editing form if editingProductId is not null */}
      {editingProductId && (
        <Form onSubmit={handleEditFormSubmit}>
          <Form.Group className="mb-3" controlId="editProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editImage">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default Admin;
