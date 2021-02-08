const mongoose = require('mongoose')

const PromoSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      lowercase: true,
      unique: true
    },
    rbx: {
      type: Number
    },
    is_offer_to_claim: { // A flag to indicate that this promo code needs an offer 
      type: Boolean,
      default: false
    },
    max_users: Number,
    used_by: [
      {
        type: String,
        lowercase: true
      }
    ]
  },
  {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}}
)

module.exports = Promo = mongoose.model('Promo', PromoSchema)
