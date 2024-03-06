const mongoose = require("../config/mongodb");
// Định nghĩa schema cho người dùng
const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  nameProduct: {
    type: String,
    required: true,
  },
  priceProduct: {
    type: Number,
    required: true,
  },
  imageProduct: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Products = new mongoose.model("Products", productSchema);

module.exports = Products;
