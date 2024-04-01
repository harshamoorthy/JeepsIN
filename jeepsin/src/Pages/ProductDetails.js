import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/api/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-details d-flex row container p-6">
            <div className="product-details-image col-6">
                <img src={product.image} alt={product.product_name} />
            </div>
            <div className="product-info col-6">
                <h1>{product.product_name}</h1>
                <p>Price: ${product.price}</p>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" defaultValue="1" />
                </div>
                <div>
                    <button className="btn-dark">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
