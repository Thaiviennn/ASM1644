const express = require("express");
const router = express.Router();
const controller = require("../controller/prodcutController");
const passport = require("../config/passport");

//thêm sản phẩm
router.get("/add-product", controller.renderAddProduct);
router.post("/add-product", passport, controller.handleAddProduct);
//chi tiết sản phẩm
router.get(`/detail-product/:id`, controller.detailProduct);

//xóa sản phẩm
router.delete(`/delete-product/:id`, passport, controller.deleteProduct);
//update sản phẩm
router.put(`/update-product/:id`, passport, controller.updateProduct);

//chuyển đến phần đơn hàng
router.get("/order", passport, controller.renderOrder);

//đăng xuất
router.get("/logout", controller.handleLogout);

module.exports = router;
