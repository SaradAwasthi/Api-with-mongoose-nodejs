const mongoose = require('mongoose');
require('dotenv').config();

const dbHost = process.env.DBHOST;
// Connect to MongoDB
mongoose.connect(dbHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  })