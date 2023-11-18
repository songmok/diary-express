const express = require("express");
const router = express.Router();

const { Todo } = require("../model/TodoModel");
const { User } = require("../model/UserModel");

router.post("/submit", (req, res) => {
  console.log("정보", req.body);

  let temp = {
    id: req.body.id,
    title: req.body.title,
    completed: req.body.completed,
    uid: req.body.uid,
  };
  User.findOne({ uid: req.body.uid })
    .exec()
    .then((userInfo) => {
      temp.author = userInfo._id;
      const todoPost = new Todo(temp);
      todoPost
        .save()
        .then(() => {
          res.status(200).json({ succese: true });
        })
        .catch((err) => {
          console.log("에러", err);
          res.status(400).json({ succese: false });
        });
    })
    .catch((err) => {
      console.log("에러", err);
    });
});
router.post("/list", (req, res) => {
  console.log("전체목록 호출", req.body);
  let sort = {};
  if (req.body.sort === "최신글") {
    sort = { id: -1 };
  } else {
    sort = { id: 1 };
  }
  Todo.find({ title: new RegExp(req.body.search), uid: req.body.uid })
    .populate("author")
    .sort(sort)
    .skip(req.body.skip) // 0 ~ 4, 5 ~ 9, 10~14
    .limit(5)
    .exec()
    .then((doc) => {
      console.log(doc);
      Todo.count({
        title: new RegExp(req.body.search),
        uid: req.body.uid,
      })
        .then((number) => {
          console.log(number);
          res.status(200).json({ success: true, initTodo: doc, total: number });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({ success: false });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ success: false });
    });
});
// 타이틀 업데이트
router.post("/updatetoggle", (req, res) => {
  let temp = {
    title: req.body.title,
  };

  Todo.updateOne({ id: req.body.id }, { $set: temp })
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
  Todo.deleteOne({ id: req.body.id })
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
  Todo.deleteMany()
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