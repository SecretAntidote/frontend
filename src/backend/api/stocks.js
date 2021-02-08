const express = require('express')
const isAuthed = require('../isAuthed')
const Stocks = require('../Stocks')
const router = express.Router()

router.post('/', isAuthed, async (req, res) => {
  if (!res.locals.user.is_admin) return res.send('Not admin')

  const {stocks_total} = req.body
  const stock = await Stocks.find({})
  if (!stock.length) {
    await Stocks.create({stocks_total})
  } else {
    await Stocks.updateOne({_id: stock[0]._id}, {stocks_total: Number(stocks_total)})
  }

  res.send({success: true})
})

router.get('/', isAuthed, async (req, res) => {
  const stock = await Stocks.find({})

  res.send({stock: stock[0]})
})

module.exports = router
