const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../User");

router.post("/", async (req, res) => {
  const { username, referral_user } = req.body;

  if (!username) {
    return res.status(401).send({
      message: "Must provide username."
    });
  }

  try {
    let user = await User.findOne({ username });
    const modifier = {};
    modifier.username = username;
    if (!user) {
      if (referral_user) {
        modifier.refered_by = referral_user;
      }

      console.log(referral_user)
      // Register if not exist
      user = await User.create(modifier);
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
