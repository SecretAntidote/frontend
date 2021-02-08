const express = require("express");
const User = require("../User");
const Affiliate = require("../Affiliate");
const { convertDollarsToRbx } = require("../utils");
const isAuthed = require("../isAuthed");
const router = express.Router();
const mongoose = require("mongoose");

// @TODO(FAHME) make postback url's more secure to avoid
// Fraud transactions
router.get("/postback", async (req, res) => {
  try {
    const { aff_sub5, payout, aff_sub4 } = req.query;
    const user = await User.findOne({ username: aff_sub5 });
    if (!user) {
      return res
        .status(400)
        .send({ message: "No user found with the same username" });
    }

    const affiliate = await Affiliate.findOne({
      username: aff_sub5,
      click_id: aff_sub4,
      is_finished: false
    });

    if (!affiliate) {
      return res.status(400).send({ message: "Click id is invalid" });
    }

    await Affiliate.updateOne({ _id: affiliate._id }, { is_finished: true });

    await User.updateOne(
      { username: aff_sub5 },
      { $inc: { rbx: convertDollarsToRbx(Number(payout)) } }
    );

    res.send({ success: true });
  } catch (err) {
    console.log(err);
    res.status(401).send({
      message: "UNAUTHORIZED"
    });
  }
});

router.post("/generate-click", isAuthed, async (req, res) => {
  try {
    const username = res.locals.user.username;
    const clickId = mongoose.Types.ObjectId();

    await Affiliate.create({
      click_id: clickId,
      username,
      is_finished: false
    });

    res.send({ clickId });
  } catch (err) {
    console.log(err);
    res.status(401).send({
      message: "UNAUTHORIZED"
    });
  }
});

module.exports = router;
