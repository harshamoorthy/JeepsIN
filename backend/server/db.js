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
    const products = await db.collection("Products").find({}).toArray();
    // console.log(products)
    return products;
  }



module.exports = { connect_to_db ,getProducts};