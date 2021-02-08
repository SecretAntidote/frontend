const mongoose = require('mongoose')

const StocksSchema = new mongoose.Schema({
  stocks_total: {
    Type: Number,
    default: 0
  }
})

module.exports = Stocks = mongoose.model('Stocks', StocksSchema)
