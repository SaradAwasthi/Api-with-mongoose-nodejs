const mongoose = require('mongoose');
require('dotenv').config();

const dbHost = process.env.DBHOST;
let isConnected = false
// Connect to MongoDB
const connectedToDatabase = async()=>{
  if(isConnected) return;
  try {
    await mongoose.connect(dbHost, {
      useNewUrlParser: true,
      useUnifiedTopology:true
    })
    isConnected=true;
    console.log("Mongodb connected successfully.")
  } catch (error) {
    console.error(error)
  }
}

module.exports = connectedToDatabase;