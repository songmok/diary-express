const mongoose = require("mongoose");

const cateSchema = new mongoose.Schema(
  {
    cateName: String,
    uid: String,
  },
  { collection: "categories" }
);

const Cate = mongoose.model("Cate", cateSchema);
module.exports = { Cate };
