const express = require('express')
const isAuthed = require('../isAuthed')
const Transaction = require('../Transaction')
const router = express.Router()

router.get('/list', isAuthed, async (req, res) => {
  const {page, limit} = req.query
  const offset = (Number(page) - 1) * Number(limit)
  const totalTransactions = await Transaction.countDocuments()
  const transactions = await Transaction.find({username: res.locals.user.username})
    .skip(offset)
    .limit(Number(limit))
    .sort({created_at: -1})
  res.send({transactions, total_pages: Math.ceil(totalTransactions / Number(limit))})
})

module.exports = router
