const product = require("../model/Product");
const order = require("../model/Order");
const multiparty = require("multiparty");
const path = require("path");
const fs = require("fs-extra");
let renderAddProduct = (req, res) => {
  res.render("addProduct.hbs");
};

let handleAddProduct = (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).send(err.message);
    const { productName, price, description } = fields;
    // Lấy đường dẫn tạm thời của file tải lên
    const { path: tempPath } = files.image[0];

    const uploadPath = path.join(
      __dirname,
      "../public/images",
      files.image[0].originalFilename
    );

    fs.move(tempPath, uploadPath, (err) => {
      if (err)
        return res.render("addProduct.hbs", {
          message: "File upload đã tồn tại",
        });

      //lấy số lượng sản phẩm
      // Lưu thông tin sản phẩm vào database
      product.countDocuments().then((count) => {
        product.create({
          id: "SP" + (count + 1),
          nameProduct: productName[0],
          priceProduct: price[0],
          imageProduct: `/images/${files.image[0].originalFilename}`,
          description: description[0],
        });
      });

      req.flash("success", "Thêm sản phẩm thành công");
      return res.redirect("/");
    });
  });
};

//chi tiết sản phẩm:
let detailProduct = (req, res) => {
  const id = req.params.id;
  product.findOne({ id: id }).then((product) => {
    res.render("detailProduct.hbs", { product: product });
  });
};

//xóa sản phẩm
let deleteProduct = (req, res) => {
  const id = req.params.id;
  if (id.startsWith("SP")) {
    product.findOneAndDelete({ id: id }).then((product) => {
      fs.unlink(path.join(__dirname, "../public", product.imageProduct));
      return res.json({ status: 200, message: "Xóa sản phẩm thành công" });
    });
  } else {
    order.findOneAndDelete({ orderId: id }).then((order) => {
      res.json({ status: 202, message: "Xóa đơn hàng thành công" });
    });
  }
};

//update sản phẩm
let updateProduct = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const price = req.body.price;
  product
    .updateOne({ id: id }, { $set: { nameProduct: name, priceProduct: price } })
    .then((product) => {
      res.json({ status: 200, message: "Cập nhật sản phẩm thành công" });
    });
};

//render trang Order
let renderOrder = (req, res) => {
  order
    .find({})
    .then((orders) => {
      res.render("order.hbs", {
        orders: orders,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

let handleLogout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
module.exports = {
  renderAddProduct: renderAddProduct,
  handleAddProduct: handleAddProduct,
  detailProduct: detailProduct,
  deleteProduct: deleteProduct,
  updateProduct: updateProduct,
  renderOrder: renderOrder,
  handleLogout: handleLogout,
};
