const express = require("express");
const isAuthed = require("../isAuthed");
const router = express.Router();

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

module.exports = router;
