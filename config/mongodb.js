const mongodb = require("mongoose");
//kết nối đến MongoDB
mongodb
  .connect("mongodb+srv://Oanh:Oanh12345@cluster0.rb6n9ow.mongodb.net/oanh")
  .then(() => {
    console.log("Mongoose Connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongodb;
