const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../User");

router.post("/", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(401).send({
      message: "Must provide username."
    });
  }

  try {
    let user = await User.findOne({ username });
    if (!user) {
      // Register if not exist
      user = await User.create({ username });
    }

    // Authenticate
    const token = jwt.sign(
      { username: user.username, rbx: user.rbx, _id: user._id },
      process.env.JWT_SECRET
    );

    res.send({
      token
    });
  } catch (err) {
    res.status(401).send({
      message: "UNAUTHORIZED"
    });
  }
});

module.exports = router;
