<template>
  <div>
    <section class="section p-0">
      <!-- <div class="container">
        <Statistics />
      </div> -->
      <div class="container">
        <div class="column">
          <h3 class="title title__36 text_black has-text-weight-thin">Withdraw Robux 💸</h3>
          <div class="columns">
            <div class="column col-img">
              <div class="column_box">
                <img src="~/assets/img/transparent-box.png" alt="" />
                <h6 class="title title__25 has-text-weight-thin">Available balance</h6>
                <h2 class="title title__55">R$ {{ stats.rbx }}</h2>
              </div>
            </div>
            <div class="column col-stepper">
              <Stepper @confirmed-withdraw="confirmedWithdraw" />
              <!-- <img src="~/assets/img/transparent-box.png" alt="" /> -->
            </div>
          </div>
          <section class="section pb-0">
            <div class="withdraw-inner">
              <h6 class="title title__36 has-text-weight-thin">Recent Withdrawals <i class="fa fa-arrow-right" /></h6>
              <div
                v-for="transaction in transactions"
                :key="transaction._id"
                class="columns padding_top_15 is-flex-mobile"
              >
                <div class="column is-half is-8-mobile">
                  <div class="is-flex">
                    <div class="title_box">
                      <h1 class="title title__45 title-char">
                        {{ transaction.username.charAt(0).toUpperCase() }}
                      </h1>
                    </div>
                    <div class="ml-5">
                      <h1 class="title title__30 color mb-0 has-text-weight-medium">
                        {{ transaction.username }}
                      </h1>
                      <p class="subtext color desc">
                        {{ transaction.status }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="column is-half is-4-mobile">
                  <div class="has-text-right">
                    <h1 class="title right_title title__30 color mb-0 has-text-right-mobile has-text-weight-medium">
                      -{{ transaction.amount }}
                    </h1>
                    <p class="subtext color has-text-weight-thin date">
                      {{ formatDate(transaction.created_at) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- <div class="card">
            <div class="card-content">
              <Stepper :step="step" />
              <div class="is-flex is-justify-content-space-between">
                <button class="button" :disabled="step == 1" @click="step--">
                  PREVIOUS
                </button>
                <button class="button" :disabled="step == 3" @click="step++">
                  NEXT
                </button>
              </div>
            </div>
          </div> -->
          <!-- <h1 class="is-uppercase has-text-weight-bold subtitle mb-3 pt-6">
            WITHDRAW HISTORY
          </h1>
          <div class="card" style="height: 100%">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th><abbr title="ID">ID</abbr></th>
                  <th><abbr title="Username">Username</abbr></th>
                  <th><abbr title="Amount">Amount</abbr></th>
                  <th><abbr title="Date">Date</abbr></th>
                  <th><abbr title="Status">Status</abbr></th>
                </tr>
                <tr v-for="transaction in transactions" :key="transaction._id">
                  <td>{{ transaction._id }}</td>
                  <td>{{ transaction.username }}</td>
                  <td>{{ transaction.amount }}</td>
                  <td>{{ formatDate(transaction.created_at) }}</td>
                  <td>{{ transaction.status }}</td>
                </tr>
              </thead>
            </table>
          </div> -->
        </div>
      </div>
    </section>
    <div class="container">
      <div class="section">
        <Social />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Stepper from '@/components/Stepper'
import Statistics from '@/components/Statistics'

export default {
  name: 'Withdraw',
  layout: 'homeLayout',
  components: {
    Stepper,
    Statistics
  },
  data() {
    return {
      number: 10,
      step: 1,
      transactions: []
    }
  },
  computed: {
    stats() {
      return this.$store.state.stats
    }
  },
  created() {
    this.$nuxt.$on('confirmed-withdraw', async () => {
      const transaction = await this.getTransactions()
      this.transactions = transaction
    })
    this.$nuxt.$on('reset-withdraw', () => {
      this.step = 1
    })
  },
  async beforeMount() {
    const transaction = await this.getTransactions()
    this.transactions = transaction
  },
  methods: {
    async confirmedWithdraw() {
      const transaction = await this.getTransactions()
      this.transactions = transaction
    },
    async getTransactions() {
      const {data} = await this.$axios.get('transactions/list')
      return data.transactions
    },
    formatDate(currentDate) {
      const date = new Date(currentDate)
      return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    }
  }
}
</script>

<style lang="scss" scoped>
abbr {
  text-decoration: none;
}
.secction.social {
  max-width: 90%;
  margin: 0 auto;
}

.title_box {
  background: #dbf5e2;
  display: inline-block;
  padding: 10px 20px;
  border-radius: 30px 30px 0 30px;
}
.title_box .title {
  color: #34bf49;
}
@media only screen and (min-width: 1300px) {
  h3,
  h6 {
    font-size: 25px;
  }
  .section {
    margin-top: 25px;
  }
}
@media only screen and (min-width: 1900px) {
  h3,
  h6 {
    font-size: 40px;
  }
  .section {
    margin-top: 60px;
  }
}

@media screen and (max-width: 550px) {
  .withdraw-inner {
    .title {
      font-size: 26px;
      line-height: 39px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .title_box {
      height: 69px;
      width: 69px;
      display: flex;
      align-items: center;
      justify-content: center;
      h1 {
        font-size: 22px;
        line-height: 33px;
        font-weight: 700 !important;
      }
    }
    .right_title {
      justify-content: flex-end;
    }
    .date {
      font-size: 14px;
    }
    .desc {
      font-size: 16px;
    }
    .title-char {
      font-size: 34px !important;
    }
  }
}
</style>
