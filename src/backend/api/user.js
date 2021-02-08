const express = require('express')
const isAuthed = require('../isAuthed')
const router = express.Router()
const noblox = require('noblox.js')
const User = require('../User')
const FakeStats = require('../FakeStats')
const Transaction = require('../Transaction')
const Stocks = require('../Stocks')

router.get('/me', isAuthed, async (req, res) => {
  try {
    res.send({user: res.locals.user})
  } catch (err) {
    res.status(401).send({
      message: 'UNAUTHORIZED'
    })
  }
})

router.get('/current-online', async (req, res) => {
  const randomOnlineUsers = Math.floor(Math.random() * (299 - 200) + 200)
  const fakeStats = await FakeStats.find({})
  if (fakeStats.length <= 0) {
    await FakeStats.create({
      online_users: randomOnlineUsers
    })
  }

  await FakeStats.updateOne({online_users: randomOnlineUsers})

  const {online_users} = fakeStats[0]
  res.send({onlineUsers: online_users})
})

router.get('/stats', isAuthed, async (req, res) => {
  try {
    const id = res.locals.user._id

    const [user, transactions, stock] = await Promise.all([
      User.findOne({_id: id}),
      Transaction.find({status: 'sent'}),
      Stocks.find({})
    ])

    res.send({
      rbx: user.rbx,
      totalPaid: transactions.reduce((accumulator, rbx) => accumulator + rbx.amount, 0),
      totalStock: stock[0].stocks_total
    })
  } catch (err) {
    res.status(401).send({
      message: 'UNAUTHORIZED'
    })
  }
})

router.post('/check-username', async (req, res) => {
  try {
    const {username} = req.body
    const user = await User.findOne({username})
    if (!user) {
      return res.send({success: false})
    }

    res.send({success: true})
  } catch (err) {
    console.log(err)
    res.status(401).send({
      message: 'UNAUTHORIZED'
    })
  }
})

router.post('/withdraw', isAuthed, async (req, res) => {
  const {amount} = req.body
  if (!amount) {
    return res.send({
      success: false,
      message: 'Provide amount'
    })
  }

  try {
    const {_id, username} = res.locals.user

    const stock = await Stocks.find({})
    if (stock[0].stocks_total < amount) {
      return res.send({
        success: false,
        message: "We don't have enough amout in our stock try again later."
      })
    }

    const user = await User.findOne({_id})
    if (amount > user.rbx) {
      return res.send({
        success: false,
        message: "You don't have suffecient amount in your account to withdraw."
      })
    }

    const userId = await noblox.getIdFromUsername(String(username))
    if (!userId) {
      return res.send({
        success: false,
        message: 'Username is not recognized.'
      })
    }

    await noblox.groupPayout(process.env.GROUP_ID, userId, amount)

    await Transaction.create({
      username,
      status: 'sent',
      amount
    })

    await User.updateOne({_id}, {$inc: {rbx: Number(-amount)}})
    await Stocks.updateOne({_id: stock[0]}, {$inc: {stocks_total: Number(-amount)}})

    res.send({success: true})
  } catch (err) {
    console.log(err)
    res.send({
      success: false,
      message: `${err.message}`
    })
  }
})

module.exports = router
