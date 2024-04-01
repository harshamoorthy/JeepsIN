require("dotenv").config();
const { MongoClient } = require("mongodb");
let db;


async function connect_to_db() {
  try {
    const client = new MongoClient(process.env.DB_URL);
    await client.connect();
    console.log("connected to DB");
    db = client.db();
  } catch (error) {
    console.log(error);
  }
}

async function getProducts() {
    const products = await db.collection("products").find({}).toArray();
    return products;
  }

  async function getUserByUsername(username){
    const user = await db.collection("users").findOne({ username });
    return user;
  }



module.exports = { connect_to_db ,getProducts, getUserByUsername};