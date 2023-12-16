const express = require("express");
const router = express.Router();

const { Cate } = require("../model/CateModel");
const { User } = require("../model/UserModel");

// 카테고리 생성
router.post("/categories", (req, res) => {
  let temp = {
    cateId: req.body.cateId,
    cateName: req.body.cateName,
    uid: req.body.uid,
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
  const { uid } = req.query;

  Cate.find({ uid: uid })
    .exec()
    .then((category) => {
      if (category) {
        res.status(200).json({
          success: true,
          message: "카테고리 조회 성공",
          category: category,
        });
      } else {
        res
          .status(404)
          .json({ success: false, message: "카테고리를 찾을 수 없음" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false, message: "카테고리 조회 실패" });
    });
});
// 카테고리 삭제
router.delete("/delete", (req, res) => {
  Cate.deleteOne({ _id: req.body.id })
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
