const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  res.send({ message: `Hello Express!` });
});

app.get("/api/customers", (req, res) => {
  res.send([{ id: 1 }, { id: 2 }]);
});

app.listen(port, () => {
  const mongoURI = process.env.MONGO_URI;
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB 연결 성공");
      console.log(`Example app listening on port ${port}`);
    })
    .catch((err) => {
      console.log(`DB 연결 실패 ${err}`);
    });
});
