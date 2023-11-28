// mongoose 모듈
const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    id: Number,
    completed: Boolean,
    uid: String,
    date: String,
    desc: String,
    category: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { collection: "todos" }
);
const Todo = mongoose.model("Todo", todoSchema);
module.exports = { Todo };
