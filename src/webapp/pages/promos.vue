<template>
  <section class="section">
    <div class="container">
      <Statistics />
    </div>

    <div class="promo-page container mt-5 pt-2">
      <h2 class="is-size-5 title">REDEEM CODE</h2>

      <div class="columns mb-0 mt-4">
        <div class="column mb-0 py-0 is-two-thirds pr-0">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <h6 class="card-title mb-4">
                  How do I get a Rbx promotional code?
                </h6>
                <p>
                  <small
                    >We Give codes regularly to our Youtuber Partners and our Discord server members. a valid promotion
                    code will add robux to your RbxCloud account</small
                  >
                </p>
                <h6 class="card-title mb-4">
                  How do I use my promotional code?
                </h6>
                <p>
                  <small
                    >This is the place to redeem your code. Enter the promo code in the section below and your free
                    robux will be automatically added to your RbxCloud account. Remember that promo codes may expire or
                    only be active for a short period of time, so make sure to use your code right away.</small
                  >
                </p>

                <form class="card-form field is-grouped mt-5 mb-4 pt-3">
                  <div class="custom-floating-input control is-expanded">
                    <input class="input" v-model="code" type="text" required id="code-input" />
                    <label for="code-input">Enter a valid RbxCloud R$ Code!</label>
                    <span class="line"></span>
                  </div>
                  <p class="control">
                    <button
                      @click="redeemCode"
                      class="button is-primary submit-btn has-text-weight-semibold is-uppercase"
                    >
                      Redeem
                    </button>
                  </p>
                </form>
                <p :class="success ? 'redeem_success' : ''">{{ message }}</p>
              </div>
            </div>
          </div>
          `
        </div>
        <div class="column mb-0 py-0">
          <div class="promo-image">
            <img src="https://rbxcloud.com/img/EasyRBX.80b01b17.png" alt="promo image" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Statistics from '@/components/Statistics'
const USE_PROMO = 'promo/use'

export default {
  name: 'Earn',
  layout: 'homeLayout',
  data() {
    return {
      code: '',
      message: '',
      success: false
    }
  },
  components: {
    Statistics
  },
  methods: {
    async redeemCode(event) {
      event.preventDefault()
      const {data} = await this.$axios.post(USE_PROMO, {code: this.code})
      if (data.success) {
        this.message = `Code redeemed ! rbx earned ${data.rbx}`
        this.success = true
      } else {
        this.success = false
        this.message = data.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  background: #f5f7fd;
}

.redeem_success {
  color: green;
}

.promo-page {
  .title {
    color: #a0a0a0;
  }
  .card {
    box-shadow: 0 0 5px rgba(gray, 0.1);
    .card-content {
      color: rgba(13, 34, 49, 0.7);
    }
    .card-title {
      color: rgba(13, 34, 49, 0.7);
      font-size: 14px;
    }
    .card-form {
      max-width: 500px;
      .submit-btn {
        background: rgb(52, 191, 73);
        padding: 21px 18px;
        &:hover {
          background: rgb(52, 191, 73, 0.9);
        }
      }
    }
  }

  .promo-footer {
    color: rgba(0, 0, 0, 0.54);
  }
}

// custom input
.custom-floating-input {
  position: relative;
  label {
    position: absolute;
    top: 10px;
    left: 0;
    z-index: 0;
    transition: all 0.3s;
    font-size: 16px;
  }
  .line {
    display: block;
    transition: all 0.3s;
    width: 0;
    height: 2px;
    background: #000;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;
  }
  input {
    border-width: 0 0 1px !important;
    outline: none;
    box-shadow: none;
    padding: 0;
    &:valid,
    &:focus {
      border: none;
      + label {
        top: -15px;
        font-size: 13px;
      }
      ~ .line {
        left: 0;
        width: 100%;
        transform: none;
      }
    }
  }
}
</style>
