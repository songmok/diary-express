const express = require("express");
const router = express.Router();

const { Cate } = require("../model/CateModel");
const { User } = require("../model/UserModel");

// 카테고리 생성
router.post("/categories", (req, res) => {
  let temp = {
    id: req.body.id,
    cateName: req.body.cateName,
    uid: req.body.uid,
    completed: req.body.completed,
  };
  User.findOne({ uid: req.body.uid })
    .exec()
    .then((userInfo) => {
      Cate.findOne({ cateName: req.body.cateName })
        .exec()
        .then((eqcategories) => {
          if (eqcategories) {
            res.status(409).json({
              success: false,
              message: "이미 존재하는 카테고리입니다.",
            });
          } else {
            const catePost = new Cate(temp);
            catePost
              .save()
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
          }
        });
    });
});

// 카테고리 조회
router.get("/categet", (req, res) => {
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
// 카테고리 삭제
router.delete("/delete", (req, res) => {
  console.log(req.body);
  Cate.deleteOne({ id: req.body.id })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});
module.exports = router;
