module.exports = {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,
  telemetry: false,
  srcDir: "./src/webapp",
  loading: false,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "rblx-spa",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
        },
        {
          rel: 'stylesheet',
          href:
            'https://cdn.rawgit.com/octoshrimpy/bulma-o-steps/master/bulma-steps.css'
        }
    ],
    script: [
      {
        src: "https://kit.fontawesome.com/2def6b71ee.js",
        body: true,
        crossorigin: "anonymous"
      }
    ]
  },

  env: {
    host: `${process.env.NODE_ENV == 'production' ? 'https://roblox-fahmi.herokuapp.com/' : 'http://localhost:3000/'}`
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  // css: ["~assets/css/style.scss"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "@nuxtjs/bulma",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth"
  ],
  auth: {
    // Options
    redirect: {
      login: "/",
      logout: "/",
      home: "/earn"
    },
    rewriteRedirects: true,
    cookie: false,
    localStorage: {
      prefix: "auth."
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: "/auth", method: "post", propertyName: "token" },
          user: { url: "/users/me", method: "get", propertyName: "user" },
          logout: false
        }
      }
    },
    resetOnError: false,
    watchLoggedIn: true,
    rewriteRedirects: true
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: `${process.env.NODE_ENV == 'production' ? 'https://roblox-fahmi.herokuapp.com/api' : 'http://localhost:3000/api'}`
  },

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    }
  }
};
