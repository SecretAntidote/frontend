const express = require('express')
const isAuthed = require('../isAuthed')
const router = express.Router()
const Social = require('../Social')
const User = require('../User')

router.post('/claim', isAuthed, async (req, res) => {
  const {social_type} = req.body
  const {_id} = res.locals.user

  if (!social_type) {
    return res.status(400).send({
      message: 'Missing field.'
    })
  }

  const social = await Social.findOne({
    social_type,
    users_earned: {
      $nin: [_id]
    }
  })

  if (!social) {
    return res.send({success: false})
  }

  await Social.updateOne(
    {social_type},
    {
      $push: {
        users_earned: _id
      }
    }
  )

  await User.updateOne({_id}, {$inc: {rbx: Number(social.rbx)}})

  res.status(200).send({success: true})
})

router.post('/create', isAuthed, async (req, res) => {
  if (!res.locals.user.is_admin) return res.send('Not admin');

  const {social_type, rbx} = req.body

  try {
    const isSocialExist = await Social.findOne({social_type})
    if (isSocialExist) {
      return res.status(400).send({
        message: "There's already social with the same name"
      })
    }

    await Social.create({social_type, rbx: Number(rbx)})

    res.send({success: true})
  } catch (err) {
    res.send({message: 'unauthorized'})
  }
})

module.exports = router
