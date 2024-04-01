import React, { useState } from "react";
import axios from "axios";

const ReturnPage = () => {
  const [OrderID, setOrderID] = useState("");
  const [error, setError] = useState("");
  const [qrImage, setQrImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(""); // Reset error state

    if (!OrderID) {
      setError("Please enter Order ID");
      return;
    }

    axios.post("http://localhost:8000/api/products/return_product", { value: OrderID })
      .then(response => {
        if (response.data.success) {
          setQrImage(response.data.qrImage);
        } else {
          setError("Failed to generate QR Code for your order...");
        }
      })
      .catch(err => {
        console.log(err);
        setError("Failed to generate QR Code for your order... catch block");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-75">
        <h1> Return your product here... </h1>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="text">
              <strong>Enter the Order ID:</strong>
            </label>
            <input type="text" placeholder="Enter Order ID" autoComplete="off" name="OrderID" className="form-control rounded-0" onChange={(e) => setOrderID(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-success rounded-0">
            Proceed
          </button>
        </form>
        {qrImage && <img src={qrImage} alt="QR Code" />}
      </div>
    </div>
  );
};

export default ReturnPage;
