const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../User')

router.post('/', async (req, res) => {
  const {username, referral_user, is_admin, password} = req.body
  if (!username) {
    return res.status(400).send({
      message: 'Missing field.'
    })
  }

  try {
    let user

    if (is_admin) {
      if (!password) {
        return res.status(400).send({
          message: 'UNAUTHORIZED'
        })
      }

      user = await User.findOne({
        username,
        password,
        is_admin: true
      })

      if (!user) {
        return res.status(400).send({
          message: "User doesn't exists."
        })
      }
    } else {
      user = await User.findOne({username, is_admin: false})

      const userCreateQuery = {}
      userCreateQuery.username = username
      if (!user) {
        if (referral_user) {
          userCreateQuery.refered_by = referral_user
        }

        // Register if not exist
        user = await User.create(userCreateQuery)
      }
    }

    // Authenticate
    const token = jwt.sign({username: user.username, rbx: user.rbx, _id: user._id, is_admin: user.is_admin}, process.env.JWT_SECRET)

    res.send({ token })
  } catch (err) {
    res.status(401).send({
      message: 'UNAUTHORIZED'
    })
  }
})

module.exports = router
