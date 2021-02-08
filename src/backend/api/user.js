const express = require("express");
const isAuthed = require("../isAuthed");
const router = express.Router();
const User = require("../User");

router.get("/me", isAuthed, async (req, res) => {
  try {
    res.send({ user: res.locals.user });
  } catch (err) {
    console.log(err)
    res.status(401).send({
      message: "UNAUTHORIZED"
    });
  }
});

router.get("/stats", isAuthed, async (req, res) => {
  try {
    const id = res.locals.user._id
    const user = await User.findOne({ _id: id });
    res.send({ rbx: user.rbx });
  } catch (err) {
    console.log(err)
    res.status(401).send({
      message: "UNAUTHORIZED"
    });
  }
});

module.exports = router;
