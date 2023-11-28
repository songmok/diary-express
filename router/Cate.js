const express = require("express");
const router = express.Router();

const { Cate } = require("../model/CateModel");

// 카테고리 생성
router.post("/categories", (req, res) => {
  let temp = {
    cateName: String,
  };
  User.findOne({ uid: req.body.uid })
    .exec()
    .then((userInfo) => {
      temp.author = userInfo._id;
      const catePost = new Cate(temp);
      catePost
        .then((createdCategory) => {
          res.status(201).json({
            success: true,
            message: "카테고리가 생성되었습니다.",
            category: createdCategory,
          });
        })
        .catch((error) => {
          console.error(error);
          res
            .status(500)
            .json({ success: false, message: "카테고리 생성 실패" });
        });
    });
});
// 카테고리 조회
router.get("/categories", (req, res) => {
  Cate.find()
    .exec()
    .then((categories) => {
      res.status(200).json({
        success: true,
        message: "카테고리 조회 성공",
        categories: categories,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, message: "카테고리 조회 실패" });
    });
});
