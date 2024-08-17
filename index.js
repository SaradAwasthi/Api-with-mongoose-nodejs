// const mongoose = require("mongoose");

//  mongoose.connect("mongodb://localhost:27017/myntra-clone");
//   const ProdcutSchema = new mongoose.Schema({
//     company: "String",
//     item_name: "String",
//     original_price: "Number",
//   });

// const createProduct = async () => {
//   const ProdcutModel = mongoose.model("products", ProdcutSchema);
//   const product = new ProdcutModel({
//     company: "Royal 1",
//     item_name: "T-shirt",
//     original_price: 2500,
//     current_price: 2500,
//   });
//   const result = await product.save();
//   console.log(result);
// };

// const updateProduct = async () => {
//     const ProdcutModel = mongoose.model('products', ProdcutSchema)
//     const product = await ProdcutModel.updateOne(
//         {company: 'Royal 1'},
//         {$set:{
//             item_name: 'Shirt',
//             original_price:1200,
//             // current_price:400,
//         }}
//     )
//         console.log(product)
// }

// const deleteProduct = async() =>{
//     const ProdcutModel = mongoose.model('products', ProdcutSchema)
//     const product = await ProdcutModel.deleteOne({company:'Royal 1'})
//     console.log(product)
// }

// const fetchAllProduct = async() =>{
//     const ProdcutModel = mongoose.model('products', ProdcutSchema)
//     const products = await ProdcutModel.find();
//     console.log(products)
// }

// const fetchSingleProduct = async () =>{
//     const ProdcutModel = mongoose.model('products', ProdcutSchema)
//     const product = await ProdcutModel.findOne({company:'Royal'})
//     console.log(product)
// }

// fetchSingleProduct()

require('dotenv').config();
const express = require("express");
require("./config");
const app = express();
const Products = require("./product_schema_model");
const ObjectId = require("mongoose").ObjectId;

app.use(express.json());

app.post("/create", async (req, res) => {
  const data = new Products(req.body);
  const result = await data.save();
  res.send(result);
  console.log(result);
});

app.get("/products", async (req, res) => {
  const data = await Products.find();
  const length = data.length;
  const limit = parseInt(req.query.limit) || length;
  res.send({total: length, limit: limit, result:data.slice(0,limit)});
});

app.delete("/delete/:_id", async (req, res) => {
  const result = await Products.deleteOne(req.params);
  res.send(result);
});

app.put("/update/:_id", async (req, res) => {
  const result = await Products.updateOne(req.params, {
    $set: req.body,
  });
  res.send(result);
});


//Search Api
app.get("/search/:key", async (req, res) => {
  const data = await Products.find({
    $or: [
      { "item_name": { $regex: req.params.key } },
      { "category": { $regex: req.params.key } }
    ],
  });
  const length = data.length;
  const limit = parseInt(req.query.limit) || length;
  res.send({total:length, limit: limit ,results: data.slice(0, length)});
});

app.listen(process.env.PORT);
