const order = require("../model/Order");
const product = require("../model/Product");
let detailOrder = (req, res) => {
  const id = req.params.id;
  order
    .findOne({ orderId: id })
    .populate({
      path: "products",
      select: "productId quantity -_id",
    })
    .exec()
    .then((order) => {
      const orderItem = {
        orderId: order.orderId,
        totalPrice: order.totalPrice,
      };
      let productArr = [];
      let productPromises = order.products.map((element) => {
        return product.findOne({ _id: element.productId }).then((product) => {
          const o = {
            id: product.id,
            priceProduct: product.priceProduct,
            quantity: element.quantity,
          };
          productArr.push(o);
        });
      });
      Promise.all(productPromises).then(() => {
        res.render("detailOrder.hbs", {
          orderItem: orderItem,
          productArr: productArr,
        });
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  detailOrder: detailOrder,
};
