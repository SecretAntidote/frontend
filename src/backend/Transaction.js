const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema(
  {
    status: String,
    username: String,
    amount: Number
  },
  {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}}
)

module.exports = Transaction = mongoose.model('Transaction', TransactionSchema)
