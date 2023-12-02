const mongoose = require("mongoose");
const cateSchema = new mongoose.Schema(
  {
    id: Number,
    cateName: String,
    uid: Number,
    completed: Boolean,
  },
  { collection: "categories" }
);

const Cate = mongoose.model("Cate", cateSchema);
module.exports = { Cate };
