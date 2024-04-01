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
    await db.collection("cartitem").insertOne( {updatedCart} );
    getCartitem()
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

      // Fetch the current cart from the database
      const db = await getDbConnection();
      let cart = await db.collection("cartitem").findOne({}); // Assuming single cart object in collection

      if (cart && cart.updatedCart && cart.updatedCart.products) {
          const productIndex = cart.updatedCart.products.findIndex(p => p.productId === productId);
          if (productIndex > -1) {
              const product = cart.updatedCart.products[productIndex];
              cart.updatedCart.totalItems -= product.quantity;
              cart.updatedCart.totalPrice -= product.quantity * product.price;
              cart.updatedCart.products.splice(productIndex, 1);

              // Save the updated cart back to the database
              await db.collection("cartitem").updateOne({ _id: cart._id }, { $set: { updatedCart: cart.updatedCart } });

              res.json({ message: "Product removed from cart", cart: cart.updatedCart });
          } else {
              res.status(404).json({ message: "Product not found in cart" });
          }
      } else {
          res.status(404).json({ message: "Cart not found" });
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

module.exports = { addItemToCart, removeItemFromCart, getCart };
