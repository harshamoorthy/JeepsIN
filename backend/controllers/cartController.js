// cartController.js

const { MongoClient } = require("mongodb");
require("dotenv").config();

// Simulate a single cart object in the database
let cart = {
    products: [],
    totalItems: 0,
    totalPrice: 0
};

async function getDbConnection() {
    const client = new MongoClient(process.env.DB_URL);
    await client.connect();
    return client.db();
}

async function getCartitem() {
    const db = await getDbConnection();
    console.log("get cart items function called")
    const cart = await db.collection("cartitem").find({}).toArray(); 
    console.log(cart)
    return cart;
}

async function saveCart(updatedCart) {
    const db = await getDbConnection();
    
    // Try to fetch the existing cart document. Assume there's only one cart document.
    const existingCart = await db.collection("cartitem").findOne({});
    
    if (existingCart) {
        // If a cart exists, update the cart document with new product data
        await db.collection("cartitem").updateOne(
            { _id: existingCart._id },
            {
                $set: { updatedCart }
            }
        );
    } else {
        // If no cart exists, insert a new cart document
        await db.collection("cartitem").insertOne({ updatedCart });
    }
    
    // Optionally fetch and log the updated cart data
    const updatedCartData = await getCartitem();
    console.log(updatedCartData);
}

async function getCartitem() {
    const db = await getDbConnection();
    const cart = await db.collection("cartitem").findOne({});
    return cart;
}


async function addItemToCart(req, res) {
    try {
        const { productId, quantity, price } = req.body;

        const product = { productId, quantity, price };
        cart.products.push(product);
        cart.totalItems += quantity;
        cart.totalPrice += quantity * price;

        await saveCart(cart);
        
        res.json({ message: "Product added to cart", cart });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function removeItemFromCart(req, res) {
    try {
        const { productId } = req.params;
        console.log(`Removing product with ID: ${productId}`);
        const db = await getDbConnection();

        // Fetch the cart data
        const cartData = await db.collection("cartitem").findOne({});
        console.log('Cart data fetched:', cartData);

        if (!cartData || !cartData.updatedCart || !cartData.updatedCart.products) {
            return res.status(404).json({ message: "Cart not found or no products in cart" });
        }

        const productsArray = cartData.updatedCart.products;
        console.log('Products in cart:', productsArray);

        const productIndex = productsArray.findIndex(product => product.productId === productId);
        console.log(`Product index in cart: ${productIndex}`);

        if (productIndex > -1) {
            productsArray.splice(productIndex, 1);

            const updatedTotalItems = productsArray.length;
            const updatedTotalPrice = productsArray.reduce((sum, product) => sum + (product.price * product.quantity), 0);

            await db.collection("cartitem").updateOne(
                { _id: cartData._id },
                { 
                    $set: {
                        "updatedCart.products": productsArray,
                        "updatedCart.totalItems": updatedTotalItems,
                        "updatedCart.totalPrice": updatedTotalPrice
                    } 
                }
            );

            res.json({ message: "Product removed from cart", cart: cartData.updatedCart });
        } else {
            res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}





async function getCart(req, res) {
    try {
        const cart = await getCartitem();
        res.json(cart);
    } catch (error) {
        console.error("Error getting the cart:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
const Cart = require('../server/cartModel'); 

// Function to handle adding items to the cart
exports.addItemToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      // Cart exists for the user
      const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.products[itemIndex].quantity = quantity;
      } else {
        // Product does not exist in cart, add new item
        cart.products.push({ productId, quantity });
      }
    } else {
      // No cart for the user, create a new cart
      cart = new Cart({
        userId,
        products: [{ productId, quantity }]
      });
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to handle removing items from the cart
exports.removeItemFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      // Remove product from cart
      cart.products = cart.products.filter(p => p.productId.toString() !== productId);
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get the cart for a user
exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


