const express = require("express");
const router = express.Router();
const controller = require("../controller/orderController");
const productController = require("../controller/prodcutController");
const passport = require("../config/passport");
//xóa đơn hàng
router.delete(`/delete-order/:id`, passport, productController.deleteProduct);
//xem chi tiết đơn hàng
router.get(`/detail-order/:id`, passport, controller.detailOrder);
module.exports = router;
