require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
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
    // console.log(products)
    return products;
  }

async function insertProducts(req){
  const {product_name,price,image} = req.body;
  const result = await db.collection("products").insertOne({product_name,price,image});
  console.log("result",result);
  return result;
  
}

async function getProductById(productId) {
  try {
    const product = await db.collection("products").findOne({ _id: new ObjectId(productId) });
    return product;
  } catch (error) {
    console.error("Error getting product by ID:", error);
    throw new Error("Failed to get product by ID");
  }
}

  async function deleteProduct(req) {
    try {
      const productId = req.params.id
      console.log(productId)
      const foundProduct = await db.collection("products").find({_id: new ObjectId(productId)}).toArray();
      console.log(foundProduct)
      if(foundProduct){
        const result = await db.collection("products").deleteOne({ _id: new ObjectId(productId) });
        return result;
      }
      else{
        return {error:"Product not Found"}
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Failed to delete product");
    }
  }

  async function editedProducts(req) {
    try{
      const editproductId = req.params.id;
      console.log("req body",req.body);
      console.log("editting product id",editproductId);
      const foundProduct = await db.collection("products").find({_id: new ObjectId(editproductId)}).toArray();
      console.log(foundProduct);
      if(foundProduct){
        const result = await db.collection("products").updateOne({ _id: new ObjectId(editproductId) },{$set:{product_name:req.body.product_name,price:req.body.price,image:req.body.image}});
        return result;
      }
      else{
        return {error:"Product not Found"}
      }
    }
    catch(error){
      console.error("Error editting product:", error);
      throw new Error("Failed to edit product");
    }
  }

  async function insertQRCode(value, qrImage) {
    const result = await db.collection("qrcodes").insertOne({ value, qrImage });
    console.log("QR code inserted:", result);
    return result;
  }


module.exports = { connect_to_db ,getProducts , insertProducts ,deleteProduct,editedProducts, insertQRCode, getProductById};
