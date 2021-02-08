<template>
  <section id="login-section">
    <div class="container is-fluid p-0">
      <div class="columns">
        <div class="column is-two-thirds-desktop  is-hidden-mobile login-bg">
          <div
            class="login-bg__inner is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
          >
            <div class="login-bg__text-container">
              <p
                class="has-text-white is-uppercase banner-h has-text-weight-light"
              >
                Get free <br />
                <span class="has-text-weight-bold main-text-color">
                  robux
                </span>
                <span class="has-text-weight-bold">
                  today
                </span>
              </p>
              <p class="has-text-white banner-sub">
                By downloading apps, completing Quizes, or watching videos.
                <br />
                NO password required.
              </p>
            </div>
          </div>
        </div>
        <div class="column login-input">
          <p
            class="has-text-black has-text-weight-bold is-size-5"
            style="margin-bottom: 28%;"
          >
            <span class="main-text-color">
              Rbx
            </span>
            Cloud
          </p>
          <div class="px-4">
            <p class="has-text-black has-text-weight-semibold login-input__h">
              Enter your Roblox username
            </p>
            <p class="login-input__sub my-5">
              All the robux you make will be sent to this username, so make sure
              its correct!
            </p>
            <form>
              <div class="login-input__field mb-2">
                <input
                  id="name"
                  v-model="username"
                  type="text"
                  class="login-input__field-input"
                  required
                />
                <label for="name" class="login-input__field-label">
                  Username
                </label>
              </div>
               <p class="login-input__sub my-5 referral" v-if="referralUser">
                 if you're login for the first time {{ referralUser }} will earn 5% every time you earn Robux because you will join using his referral link.
              </p>
              <button
                class="button box is-fullwidth is-uppercase py-5 has-text-weight-bold login-input__btn has-text-white"
                :disabled="checkUser"
                @click.prevent="openConfirmBox"
              >
                login
              </button>
            </form>
          </div>
          <hr />
          <div class="login-input__caption">
            <p class="login-input__caption-text">
              We are not affiliated with any of the games or companies shown on
              this website. Use of any logos or trademarks are for reference
              purposes only. By utilizing the website, you agree to be bound by
              the terms of service.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="openPopup" class="box popup p-4">
      <div class="columns">
        <div class="column has-text-centered popup__container">
          <figure>
            <img
              src="~assets/img/warning.png"
              class="image is-96x96"
              style="margin-left: auto;margin-right: auto;"
            />
          </figure>
          <p class="popup__text mt-2 mb-4">
            Are you sure that's your username?
          </p>
          <p class="popup__caption-text mb-4">
            All the robux you make will be sent to this username, so make sure
            its correct!
          </p>
          <div class="columns">
            <div class="column">
              <button
                class="button box is-fullwidth is-uppercase py-5 has-text-weight-bold popup__no-btn has-text-white"
                @click.prevent="openPopup = false"
              >
                no
              </button>
            </div>
            <div class="column">
              <button
                class="button box is-fullwidth is-uppercase py-5 has-text-weight-bold popup__yes-btn has-text-white"
                @click.prevent="goToNextPage"
              >
                yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'index',
  middleware: ['auth'],
  data () {
    return {
      username: '',
      openPopup: false,
      referralUser: null
    }
  },
  async mounted () {
    this.resetStatsStore()
    const { ref } = this.$route.query
    if (ref) {
      const { success } = await this.$axios.$post('users/check-username', {
        username: ref
      })
      if (success) {
        this.referralUser = ref
      }
    }
  },
  computed: {
    checkUser () {
      if (this.username === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    openConfirmBox () {
      this.openPopup = true
    },
    async goToNextPage () {
      this.openPopup = false
      await this.$auth.loginWith('local', {
        data: {
          username: this.username,
          referral_user: this.referralUser
        }
      })
      this.$router.push('/earn')
    },
    resetStatsStore () {
      this.$store.commit('stats/setRbx', 0)
      this.$store.commit('stats/setOnlineUsers', 0)
      clearInterval(this.$store.state.stats.intervalId)
    }
  }
}
</script>

<style lang="scss" scoped>
$thetransition: all 0.4s cubic-bezier(1, 0.25, 0, 0.75) 0s;
.main-text-color {
  color: #16cd69;
}
.login-bg {
  background: linear-gradient(rgba(10, 19, 52, 0.75), rgba(10, 19, 52, 0.75)),
    url("~assets/img/login-bg.jpg") center / cover;
  height: 102vh;
  padding: 0;
  &__inner {
    height: 100%;
    width: 100%;
    background: url("~assets/img/login-coins-bg.png") center / cover;
  }
  &__text-container {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    .banner-h {
      font-size: 80px;
    }
    .banner-sub {
      font-size: 20px;
    }
  }
}

.login-input {
  padding: 24px;
  &__h {
    font-size: 20px;
  }
  &__sub {
    font-size: 14px;
  }
  &__field {
    position: relative;
    height: 44px;
    line-height: 44px;
  }
  &__field-label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: #999;
    transition: $thetransition;
    cursor: text;
  }
  &__field-input {
    width: 100%;
    border: 0;
    outline: 0;
    padding: 0.5rem 0;
    border-bottom: 2px solid #d3d3d3;
    box-shadow: none;
    color: #111;
    font-family: "Poppins", sans-serif;
    &:invalid {
      outline: 0;
    }
    &:focus,
    &:valid {
      border-color: #00dd22;
    }

    &:focus ~ label,
    &:valid ~ label {
      font-size: 14px;
      top: -24px;
      color: #00dd22;
    }
  }
  &__btn {
    background: #16cd69;
    transition: $thetransition;
    margin-bottom: 20%;
    border-radius: 0;
    &:hover {
      transform: scale(1.04);
    }
  }

  &__caption {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 18%;
  }

  &__caption-text {
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    color: rgba(13, 34, 49, 0.7);
  }
}
.popup {
  z-index: 9999999;
  height: 320px;
  width: 350px;
  background: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: $thetransition;
  &__text {
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    color: rgb(13, 34, 49);
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
  &__caption-text {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    color: rgb(13, 34, 49);
  }
  &__no-btn {
    background: #fd4c4c;
    transition: $thetransition;
    border-radius: 0;
    border: 0;
    &:hover {
      transform: scale(1.04);
    }
  }
  &__yes-btn {
    background: #16cd69;
    transition: $thetransition;
    border-radius: 0;
    border: 0;
    &:hover {
      transform: scale(1.04);
    }
  }
}
.referral {
  color: red;
}
</style>
