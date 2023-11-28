let express = require("express");
let router = express.Router();

const { User } = require("../model/UserModel");
// 사용자 가입 등록
router.get("/hello", (req, res) => {
  res.send({ message: `Hello Express!` });
});
router.post("/register", (req, res) => {
  console.log(req.body);
  const userData = new User(req.body);
  userData
    .save()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});
router.get("", (req, res) => {
  res.send({ message: `Hello Express!` });
});
// 이름 중복 검사
router.post("/namecheck", (req, res) => {
  console.log(req.body.displayName);
  User.findOne({ displayName: req.body.displayName })
    .exec()
    .then((doc) => {
      console.log(doc);

      let check = true;
      if (doc) {
        check = false;
      }
      res.status(200).json({ success: true, check });
    })

    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});
// 사용자 정보 업데이트
router.post("/update", (req, res) => {
  let temp = {
    email: req.body.email,
    displayName: req.body.displayName,
    uid: req.body.uid,
  };
  console.log(temp);
  User.updateOne({ uid: req.body.uid }, { $set: temp })
    .exec()
    .then(() => {
      console.log("사용자 업데이트 완료");
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});
router.post("/userout", (req, res) => {
  let temp = {
    uid: req.body.uid,
  };
  User.findOneAndDelete({ uid: temp.uid }, (err, deletedUser) => {
    if (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "회원 정보 삭제 실패" });
    } else {
      if (deletedUser) {
        res.json({ success: true, message: "회원 탈퇴되었습니다." });
      } else {
        res.json({ success: false, message: "회원 정보가 존재하지 않습니다." });
      }
    }
  });
});
module.exports = router;
