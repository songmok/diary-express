// mongoose 모듈
const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    todoId: Number,
    completed: Boolean,
    uid: String,
    date: String,
    desc: String,
    cateName: String,
    cateId: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { collection: "lists" }
);
const List = mongoose.model("list", todoSchema);
module.exports = { List };
