const mongoose = require("mongoose");

const cateSchema = new mongoose.Schema(
  {
    cateId: Number,
    cateName: String,
    uid: String,
    visible: Boolean,
  },
  { collection: "categories" }
);

const Cate = mongoose.model("Cate", cateSchema);
module.exports = { Cate };
