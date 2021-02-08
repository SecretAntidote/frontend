const express = require('express')
const User = require('../User')
const {convertDollarsToRbx} = require('../utils')
const router = express.Router()

router.get('/ogads/postback', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const whitlistedIps = [
      '50.18.215.132',
      '50.18.215.133',
      '50.18.215.134',
      '50.18.215.135',
      '107.21.28.235',
      '107.21.36.214',
      '107.23.2.46',
      '107.23.2.50',
      '54.64.15.176',
      '54.64.21.195',
      '54.94.179.76',
      '54.207.34.180',
      '54.207.36.218',
      '54.246.166.8',
      '54.246.166.9',
      '54.246.166.12',
      '54.246.166.17',
      '209.170.120.242',
      '209.170.120.243',
      '209.170.120.244'
    ]

    if (!whitlistedIps.includes(String(ip))) {
      return res.status(400).send({message: 'Unrecognized ip address'})
    }

    const {aff_sub5, payout} = req.query
    const user = await User.findOne({username: aff_sub5})
    if (!user) {
      return res.status(400).send({message: 'No user found with the same username'})
    }

    const userRbxPayout = convertDollarsToRbx(Number(payout))
    const referdUserRbx = ((5 * userRbxPayout) / 100).toFixed(2)

    const updateUsersPromises = [
      User.findOneAndUpdate(
        {username: aff_sub5},
        {
          latest_completed_offer: new Date(),
          $inc: {rbx: userRbxPayout}
        },
        {new: true, useFindAndModify: false}
      )
    ]

    if (user.refered_by) {
      updateUsersPromises.push(User.updateOne({username: user.refered_by}, {$inc: {rbx: referdUserRbx}}))
    }

    await Promise.all(updateUsersPromises)

    res.send({success: true})
  } catch (err) {
    console.log(err)
    res.status(401).send({
      message: 'UNAUTHORIZED'
    })
  }
})

router.get('/ayetstudios/postback', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const whitlistedIps = ['35.165.166.40', '35.166.159.131', '52.40.3.140']
    if (!whitlistedIps.includes(String(ip))) {
      return res.status(400).send({message: 'Unrecognized ip address'})
    }

    const {uid, currency_amount} = req.query
    const user = await User.findOne({username: uid})
    if (!user) {
      return res.status(400).send({message: 'No user found with the same username'})
    }

    const userRbxPayout = Number(currency_amount)
    const referdUserRbx = ((5 * userRbxPayout) / 100).toFixed(2)

    const updateUsersPromises = [
      User.updateOne(
        {username: uid},
        {
          latest_completed_offer: new Date(),
          $inc: {rbx: userRbxPayout}
        },
        {new: true, useFindAndModify: false}
      )
    ]

    if (user.refered_by) {
      updateUsersPromises.push(User.updateOne({username: user.refered_by}, {$inc: {rbx: referdUserRbx}}))
    }

    await Promise.all(updateUsersPromises)

    res.status(200).send({success: true})
  } catch (err) {
    console.log(err)
    res.status(401).send({
      message: 'UNAUTHORIZED'
    })
  }
})

router.get('/adgem/postback', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const whitlistedIP = '18.191.5.158'
    if (whitlistedIP !== String(ip)) {
      return res.status(400).send({message: 'Unrecognized ip address'})
    }

    const {player_id, amount} = req.query

    const user = await User.findOne({username: player_id})
    if (!user) {
      return res.status(400).send({message: 'No user found with the same username'})
    }

    const userRbxPayout = Number(amount)
    const referdUserRbx = ((5 * userRbxPayout) / 100).toFixed(2)

    const updateUsersPromises = [
      User.updateOne(
        {username: player_id},
        {
          latest_completed_offer: new Date(),
          $inc: {rbx: userRbxPayout}
        },
        {new: true, useFindAndModify: false}
      )
    ]

    if (user.refered_by) {
      updateUsersPromises.push(User.updateOne({username: user.refered_by}, {$inc: {rbx: referdUserRbx}}))
    }

    await Promise.all(updateUsersPromises)

    res.send({success: true})
  } catch (err) {
    console.log(err)
    res.status(401).send({
      message: 'UNAUTHORIZED'
    })
  }
})

router.get('/offertoro/postback', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const whitlistedIP = '54.175.173.245'
    if (whitlistedIP !== String(ip)) {
      return res.status(400).send({message: 'Unrecognized ip address'})
    }

    const {user_id, amount} = req.query
    const user = await User.findOne({username: user_id})
    if (!user) {
      return res.status(400).send({message: 'No user found with the same username'})
    }

    const userRbxPayout = Number(amount)
    const referdUserRbx = ((5 * userRbxPayout) / 100).toFixed(2)

    const updateUsersPromises = [
      User.updateOne(
        {username: user_id},
        {
          latest_completed_offer: new Date(),
          $inc: {rbx: userRbxPayout}
        },
        {new: true, useFindAndModify: false}
      )
    ]

    if (user.refered_by) {
      updateUsersPromises.push(User.updateOne({username: user.refered_by}, {$inc: {rbx: referdUserRbx}}))
    }

    await Promise.all(updateUsersPromises)

    res.send('1')
  } catch (err) {
    console.log(err)
    res.send('0')
  }
})

router.get('/adgatemedia/postback', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const whitlistedIps = ['104.130.7.162', '52.42.57.125']
    if (!whitlistedIps.includes(String(ip))) {
      return res.status(400).send({message: 'Unrecognized ip address'})
    }

    const {s1, points} = req.query
    const user = await User.findOne({username: s1})
    if (!user) {
      return res.status(400).send({message: 'No user found with the same username'})
    }

    const userRbxPayout = Number(points)
    const referdUserRbx = ((5 * userRbxPayout) / 100).toFixed(2)

    const updateUsersPromises = [
      User.updateOne(
        {username: s1},
        {
          latest_completed_offer: new Date(),
          $inc: {rbx: userRbxPayout}
        },
        {new: true, useFindAndModify: false}
      )
    ]

    if (user.refered_by) {
      updateUsersPromises.push(User.updateOne({username: user.refered_by}, {$inc: {rbx: referdUserRbx}}))
    }

    await Promise.all(updateUsersPromises)

    res.send({success: true})
  } catch (err) {
    console.log(err)
    res.status(401).send({
      message: 'UNAUTHORIZED'
    })
  }
})

module.exports = router
