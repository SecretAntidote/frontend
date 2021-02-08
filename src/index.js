require('dotenv').config()
const express = require('express')
const {Nuxt, Builder} = require('nuxt')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const auth = require('./backend/api/auth')
const users = require('./backend/api/user')
const affiliate = require('./backend/api/affiliate')
const promo = require('./backend/api/promo')
const social = require('./backend/api/social')
const transactions = require('./backend/api/transaction')
const stocks = require('./backend/api/stocks')
const noblox = require('noblox.js')
const request = require('request')
const cors = require('cors')

const whitelist = ['https://www.rbxwallets.com', 'https://rbxwallets.com']
const corsOptionsDelegate = function(req, callback) {
  let corsOptions
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {origin: true}
  } else {
    corsOptions = {origin: false}
  }

  callback(null, corsOptions)
}

app.use(cors(corsOptionsDelegate))

// Import and Set Nuxt.js options
const nuxtConfig = require('../nuxt.config.js')
nuxtConfig.dev = process.env.NODE_ENV !== 'production'

function staticHandler(nuxt) {
  return async (req, res, next) => {
    if (req.url.match(/^\/api/)) {
      return next()
    }

    await nuxt.render(req, res)
  }
}

async function start() {
  const MONGO_OPTS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }

  mongoose.connect(process.env.DB_URL, MONGO_OPTS)

  //Get the default connection
  const db = mongoose.connection

  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))

  // Init Nuxt.js
  const nuxt = new Nuxt(nuxtConfig)

  const {host, port} = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())

  // Give nuxt middleware to express
  app.use(staticHandler(nuxt))

  app.use('/api/auth', auth)
  app.use('/api/users', users)
  app.use('/api/affiliate', affiliate)
  app.use('/api/promo', promo)
  app.use('/api/social', social)
  app.use('/api/transactions', transactions)
  app.use('/api/stocks', stocks)

  try {
    await noblox.setCookie(process.env.COOKIE)
    console.log('logged in !!')
  } catch (err) {
    console.log(err)
  }

  app.get('/api/proxy/', (req, res) => {
    const {url} = req.query
    request(url).pipe(res)
  })

  app.get('/api/ogads', async (req, res) => {
    const {affiliateid, device, ctype} = req.query

    let ip = req.headers['cf-connecting-ip']
    if (ip) {
      const list = ip.split(',')
      ip = list[list.length - 1]
    } else {
      ip = req.connection.remoteAddress
    }

    let url = `https://mobverify.com/api/v1/?affiliateid=${affiliateid}&ip=${ip}&device=${device}`
    if (ctype !== '') {
      url = `https://mobverify.com/api/v1/?affiliateid=${affiliateid}&ip=${ip}&device=${device}&ctype=1`
    }

    request({url}, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.send({type: 'error', message: err.message})
      }

      res.send(JSON.parse(body))
    })
  })

  // Listen the server
  app.listen(Number(process.env.PORT) || 3000, process.env.HOST || '0.0.0.0')
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
