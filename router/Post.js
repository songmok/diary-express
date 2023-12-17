const express = require("express");
const router = express.Router();

const { List } = require("../model/ListModel");
const { User } = require("../model/UserModel");

// 데이터 생성
router.post("/submit", (req, res) => {
  let temp = {
    listId: req.body.id,
    completed: req.body.completed,
    desc: req.body.desc,
    uid: req.body.uid,
    date: req.body.date,
    cateName: req.body.cateName,
    cateId: req.body.cateId,
  };
  User.findOne({ uid: req.body.uid })
    .exec()
    .then((userInfo) => {
      temp.author = userInfo._id;
      const todoPost = new List(temp);
      todoPost
        .save()
        .then(() => {
          res.status(200).json({
            success: true,
            message: "데이터가 생성되었습니다.",
          });
        })
        .catch((err) => {
          console.log("에러", err);
          res
            .status(400)
            .json({ success: false, message: "데이터가 생성되었습니다." });
        });
    })
    .catch((err) => {
      console.log("에러", err);
    });
});
// 리스트 호출
router.get("/listget", (req, res) => {
  const { uid } = req.query;
  List.find({
    uid: uid,
  })
    .populate("author")
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, initList: doc });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false });
    });
});
router.get("/listDateGet", (req, res) => {
  const { uid, date } = req.query;
  List.find({
    uid: uid,
    date: date,
  })
    .populate("author")
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, initList: doc });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false });
    });
});

// 수정
router.post("/updateList", (req, res) => {
  let temp = {
    desc: req.body.desc,
  };

  List.updateOne({ id: req.body.id }, { $set: temp })
    .exec()
    .then(() => {
      res.status(200).json({ succese: true });
    })
    .catch((err) => {
      console.log("에러", err);
    });
});
// 삭제
router.delete("/delete", (req, res) => {
  console.log(req.body);
  List.deleteOne({ id: req.body.id })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});
// 전체삭제
router.delete("/deleteall", (req, res) => {
  List.deleteMany()
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
