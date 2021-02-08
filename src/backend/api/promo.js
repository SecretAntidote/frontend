const express = require('express')
const Promo = require('../Promo')
const isAuthed = require('../isAuthed')
const User = require('../User')
const moment = require('moment')

const router = express.Router()

router.post('/use', isAuthed, async (req, res) => {
  const {code} = req.body
  const {_id} = res.locals.user

  try {
    const currentPromo = await Promo.findOne({
      code,
      used_by: {
        $nin: [_id]
      }
    })

    if (!currentPromo || currentPromo.used_by.length === currentPromo.max_users) {
      return res.send({
        success: false,
        message: 'The promo is expired or not valid'
      })
    }

    const user = await User.findOne({_id})
    if (currentPromo.is_offer_to_claim) {
      if (user.latest_completed_offer) {
        const latestCompletedOffer = moment(user.latest_completed_offer, 'DD/MM/YYYY')
        const promoCodeCreatedDate = moment(currentPromo.created_at, 'DD/MM/YYYY')
        
        if (promoCodeCreatedDate.isAfter(latestCompletedOffer, 'day')) {
          return res.send({
            success: false,
            message: 'You need to complete an offer in order to claim this promo code'
          })
        }
      } else {
        return res.send({
          success: false,
          message: 'You need to complete an offer in order to claim this promo code'
        })
      }
    }

    await Promo.updateOne(
      {code: code},
      {
        $push: {
          used_by: _id
        }
      }
    )

    await User.updateOne({_id}, {$inc: {rbx: currentPromo.rbx}})

    res.send({success: true, rbx: currentPromo.rbx})
  } catch (err) {
    console.log(err)
    res.status(401).send({
      success: false,
      message: 'unauthorized'
    })
  }
})

router.post('/create', async (req, res) => {
  const {code, rbx, max_users, offerToClaim} = req.body

  if (!code || !rbx || !max_users) {
    return res.send({status: false, message: 'Missing field'})
  }

  const isCodeExists = await Promo.findOne({code})
  if (isCodeExists) {
    return res.send({
      status: false,
      message: 'Code with the same name already exists.'
    })
  }

  try {
    const promo = await Promo.create({
      code: code,
      rbx: Number(rbx),
      max_users: Number(max_users),
      is_offer_to_claim: Boolean(offerToClaim)
    })

    res.status(200).send({status: true, promo: promo._doc})
  } catch (err) {
    console.log(err)
    res.status(401).send({
      message: 'unauthorized'
    })
    console.log(err)
  }
})

router.delete('/remove/:id', async (req, res) => {
  const {id} = req.params

  try {
    const removed = await Promo.findOneAndRemove({
      _id: id
    })

    if (!removed) {
      return res.send({status: false, message: 'Not removed'})
    }

    return res.status(200).send({status: true})
  } catch (err) {
    console.log(err)
    res.status(401).send({
      message: 'unauthorized'
    })
  }
})

router.put('/:id', isAuthed, async (req, res) => {
  const {is_offer_to_claim} = req.body

  if (!is_offer_to_claim) {
    res.send({
      success: false
    })
  }

  try {
    await Promo.updateOne(
      {
        _id: req.params.id
      },
      {is_offer_to_claim}
    )

    return res.send({success: true})
  } catch (err) {
    console.log(err)
    res.status(401).send({
      message: 'unauthorized'
    })
  }
})

router.get('/list', isAuthed, async (req, res) => {
  const {page, limit} = req.query
  const offset = (Number(page) - 1) * Number(limit)
  const totalPromos = await Promo.countDocuments()
  const promos = await Promo.find({})
    .skip(offset)
    .limit(Number(limit))
    .sort({created_at: -1})
  res.send({promos, total_pages: Math.ceil(totalPromos / Number(limit))})
})

module.exports = router
