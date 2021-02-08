const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../User')

router.post('/', async (req, res) => {
  const {username, referral_user} = req.body

  if (!username) {
    return res.status(401).send({
      message: 'Must provide username.'
    })
  }

  try {
    let user = await User.findOne({username, is_admin: false})
    const modifier = {}
    modifier.username = username
    if (!user) {
      if (referral_user) {
        modifier.refered_by = referral_user
      }

      // Register if not exist
      user = await User.create(modifier)
    }

    // Authenticate
    const token = jwt.sign({username: user.username, rbx: user.rbx, _id: user._id}, process.env.JWT_SECRET)

    res.send({
      token
    })
  } catch (err) {
    res.status(401).send({
      message: 'UNAUTHORIZED'
    })
  }
})

router.post('/admin', async (req, res) => {
  const {username, password} = req.body

  if (!username || !password) {
    return res.status(401).send({
      message: 'Must provide username and password.'
    })
  }

  try {
    let user = await User.findOne({username, password, is_admin: true})

    if (!user) {
      return res.status(401).send({
        message: "Ther's no user with the same creditnals"
      })
    }

    // Authenticate
    const token = jwt.sign({username: user.username, _id: user._id}, process.env.JWT_SECRET)

    res.send({
      token
    })
  } catch (err) {
    res.status(401).send({
      message: 'UNAUTHORIZED'
    })
  }
})

module.exports = router
