const express = require('express');
const cors = require('cors');  
const { connect_to_db, getProducts} = require("./db");
const { MongoClient } = require("mongodb");
const bcryptjs = require('bcryptjs');
require("dotenv").config();
const userModel = require('./user');


const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.use(cors());  // Enable CORS

app.use(express.json());



connect_to_db()
  .then(() => {
    // API Endpoints
    app.get("/api/products", async (req, res) => {
      try {
        const products = await getProducts();
        res.json(products);
      } catch (error) {
        console.error("Error getting products:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.post('/signup', async (req,res) => {
      await userModel.create(req.body)
      .then(users => res.json(users))
      .catch(err => res.json(err))
    })

    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

  
