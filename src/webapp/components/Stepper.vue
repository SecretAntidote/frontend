<template>
  <div class="steper">
    <div class="withdraw_content">
      <!-- <span class="half_round" :class="`active_${step}`"></span> -->

      <round-slider
        width="15"
        rangeColor="#34BF49"
        pathColor="#F5FFE5"
        v-model="amount"
        circleShape="half-top"
        max="50"
        radius="160"
      />
      <!-- <span class="half_round"></span> -->
      <div class="steper_step">
        <div v-if="step == 1">
          <div class="is-flex is-flex-direction-column is-justify-content-space-center is-align-items-center">
            <h6 class="title title__25 has-text-weight-thin">Amount to withdraw</h6>
            <div class="amount_field mb-5">
              <span class="title title__55 mb-0">R$</span>
              <input v-model="amount" type="number" class="input is-medium" max="50" />
            </div>

            <button class="primary_btn primary_btn__md" @click="step++" :disabled="bntDisabled">
              Withdraw
            </button>
          </div>
        </div>
        <div
          v-else-if="step == 2"
          class="is-flex is-flex-direction-column is-justify-content-space-center is-align-items-center is-text-center step_2"
        >
          <p>
            Join the group so we can <br> provide you the payout requested
          </p>
          <button class="primary_btn primary_btn__md mt-5" :disabled="bntDisabled">
            Join the group
          </button>
          <button class="primary_btn primary_btn__md mt-5" @click="step++" :disabled="bntDisabled">
            Next
          </button>
        </div>
        <div v-else-if="step == 3">
          <div class="amount_field mb-5">
            <span class="title title__55 mb-0">R$</span>
            <input disabled v-model="amount" type="number" class="input is-medium" />
          </div>

          <button
            v-if="!isConfirmed"
            class="button primary_btn primary_btn__md mt-5"
            :class="{'is-loading': bntDisabled}"
            :disabled="bntDisabled"
            @click="confirmWithdraw"
          >
            Confirm Withdraw
          </button>
          <h6
            style="color:green; text-align:center;"
            v-if="isConfirmed && !errorMessage"
            class="subtitle is-6 pt-3 is-font-14"
          >
            Withdrawn was done with success! <br />Your Robux should be in your account in the next 5 minutes.
            <div><button class="button is-small is-warning mx-3 mt-3" @click="reset">Redo process</button></div>
          </h6>
          <h6
            style="color:red; text-align:center;"
            v-if="errorMessage && !bntDisabled"
            class="subtitle is-6 pt-3 is-font-14 "
          >
            Withdrawn error! <br />{{ errorMessage }}
            <div><button class="button is-small is-warning mx-3 mt-3" @click="reset">Redo process</button></div>
          </h6>
        </div>
      </div>
      <div />
    </div>
  </div>
</template>

<script>
import RoundSlider from 'vue-round-slider'

export default {
  components: {
    RoundSlider
  },
  // props: ['step'],
  data() {
    return {
      number: 0,
      amount: 0,
      step: 1,
      isConfirmed: false,
      errorMessage: null,
      bntDisabled: false
    }
  },
  watch: {
    step(newValue, oldValue) {
      if ((this.isConfirmed || this.errorMessage) && newValue !== '3') {
        this.isConfirmed = false
        this.errorMessage = false
      }
    }
  },
  methods: {
    async confirmWithdraw() {
      try {
        this.bntDisabled = true
        const {data} = await this.$axios.post('users/withdraw', {amount: this.amount})
        if (data.success) {
          this.isConfirmed = true
          this.$emit('confirmed-withdraw')
        } else {
          this.errorMessage = data.message
        }
        this.bntDisabled = false
      } catch (e) {
        this.bntDisabled = false
      }
    },
    isNumber(event) {
      const evt = event ? event : window.event
      if (evt.key === '.') {
        evt.preventDefault()
      } else {
        return true
      }
    },
    reset() {
      this.amount = 0
      this.step = 1
    }
  }
}
</script>
<style scoped>
.steper {
  z-index: 1;
}
.amount_field {
  display: flex;
  align-items: center;
  justify-content: center;
}
.amount_field input {
  max-width: 70px;
  outline: none;
  border: 0;
  height: 50px;
  padding: 0;
  font-size: 55px;
  font-weight: 800;
  line-height: 0;
  color: #000;
  box-shadow: none;
  margin-left: 5px;
  width: auto;
  margin-top: -5px;
  background: transparent;
  border: 1px solid#fff;
}
.amount_field input:hover {
  border: 1px solid #dadada;
}

.withdraw_content {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
  padding-top: 0px;
  max-width: 310px;
}
.half_round {
  top: 0px;
  position: absolute;
  width: 460px;
  height: 200px;
  background-color: transparent;
  border-top-left-radius: 250px;
  border-top-right-radius: 250px;
  border: 10px solid #f5ffe5;
  border-bottom: 0;
}
.half_round:before {
  position: absolute;
  width: 255px;
  content: '';
  height: 210px;
  background-color: transparent;
  border-top-left-radius: 572px;
  border-top-right-radius: 0px;
  border: 10px solid #34bf49;
  border-bottom: 0;
  border-color: transparent transparent transparent transparent;
  top: -9px;
  left: -18px;
}
.half_round.active_2:before {
  border-color: #34bf49 transparent transparent #34bf49;
}
.half_round.active_3:before {
  width: 460px;
  height: 200px;
  background-color: transparent;
  border-top-left-radius: 250px;
  border-top-right-radius: 250px;
  border-color: #34bf49;
  left: -9px;
}

span.half_round.active_2:after {
  transform: translate(195px, -39px) rotate(25deg);
}
.half_round.active_3:after {
  transform: translate(35px, 149px) rotate(105deg);
  left: inherit;
  right: 0;
  bottom: 0px;
}
.withdraw_content .rs-tooltip.rs-tooltip-text.rs-edit {
  display: none;
}
.steper_step {
  margin-top: -70px;
  text-align: center;
}
</style>
