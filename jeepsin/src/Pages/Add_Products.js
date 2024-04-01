import React, { useState} from "react";
import { Container, Form, Button } from "react-bootstrap";


const Add_Products = () => {

    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    const handleInsertProduct = async () => {
        try{
          const response = await fetch(`http://localhost:8000/api/add_product`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              product_name: productName,
              price: price,
              image: image
          }),
          });
          if (response.ok) {
            // Update products state to reflect the newly added product
            const newProduct = await response.json();
            setProducts([...products, newProduct]);
            console.log("Product inserted successfully");
        } else {
            console.error("Error inserting product:", response.statusText);
        }
        } catch(error){
          console.error("Error inserting product",error)
        }
      };

      return (
          <Container className="mt-4">
            <h1>Add a new product here...</h1>
            <Form>
            <Form.Group className="mb-3" controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" placeholder="Enter product name" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" placeholder="Enter image URL" value={image} onChange={(e) => setImage(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={handleInsertProduct}>
                Add Product
            </Button>
          </Form>
        </Container>
      );
};

export default Add_Products;