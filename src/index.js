require("dotenv").config();
const express = require("express");
const { Nuxt, Builder } = require("nuxt");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const auth = require("./backend/api/auth");
const users = require("./backend/api/user");

// Import and Set Nuxt.js options
const nuxtConfig = require("../nuxt.config.js");
nuxtConfig.dev = process.env.NODE_ENV !== "production";

function staticHandler(nuxt) {
  return async (req, res, next) => {
    if (req.url.match(/^\/api/)) {
      return next();
    }

    await nuxt.render(req, res);
  };
}

async function start() {
  const MONGO_OPTS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };

  mongoose.connect(process.env.DB_URL, MONGO_OPTS);

  //Get the default connection
  const db = mongoose.connection;

  //Bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  // Init Nuxt.js
  const nuxt = new Nuxt(nuxtConfig);

  const { host, port } = nuxt.options.server;

  await nuxt.ready();
  // Build only in dev mode
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Give nuxt middleware to express
  app.use(staticHandler(nuxt));

  app.use(`/api/auth`, auth);
  app.use(`/api/users`, users);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}

start();
