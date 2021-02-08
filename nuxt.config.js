module.exports = {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,
  srcDir: "./src/webapp",
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

  // Global CSS (https://go.nuxtjs.dev/config-css)
  // css: ["@/assets/css/style.scss"],

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
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
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
    prefix: "/api"
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
