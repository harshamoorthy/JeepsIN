const express = require('express');
const cors = require('cors');  
const { connect_to_db, getProducts, getUserByUsername} = require("./db");
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
      try {
        const newUser = await userModel.create(req.body);
        console.log("User signed up:", newUser);
        res.json(newUser);
      } catch (err) {
        console.error("Signup error:", err);
        res.status(400).json({ error: "Signup failed." });
      }
    })

    app.post('/login', async (req, res) => {
      const { username, password } = req.body;
    
      // Validate request body
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
      }
    
      try {
        const user = await getUserByUsername(username);
    
        // Check if the user exists
        if (!user) {
          return res.status(404).json({ error: 'User not found.' });
        }
    
        // Compare the provided password with the stored hash
        const isMatch = await bcryptjs.compare(password, user.password);
    
        // Check if the passwords match
        if (!isMatch) {
          return res.status(401).json({ error: 'Invalid credentials.' });
        }
    
        // Generate a JWT token (optional)
        // const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
        // Send a response with the user data (without the password)
        res.json({ _id: user._id, username: user.username, email: user.email });
    
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error.' });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

  
