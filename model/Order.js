const mongoose = require("../config/mongodb");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  totalProduct: {
    type: Number,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

const Orders = new mongoose.model("Orders", orderSchema);

module.exports = Orders;
