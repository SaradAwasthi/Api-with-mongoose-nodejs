const { default: mongoose } = require("mongoose");

const ProductSchema = mongoose.Schema({
  image: String,
  company: String,
  item_name: String,
  original_price: Number,
  current_price: Number,
  discount_percentage: Number,
  rating: {
    stars: Number,
    count: Number,
  },
  category: String,
  sub_category:String
});

module.exports = mongoose.model("product", ProductSchema);
