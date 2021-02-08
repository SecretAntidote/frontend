<template>
  <div class="columns mt-5 is-multiline is-flex">
    <div class="column is-half-mobile">
      <div class="box">
        <div class="column__box">
          <div class="column__img">
            <img src="~assets/img/credit-card.png" />
          </div>
          <div class="column__text">
            <p class="mb-0 top-img__text">R$: {{ stats.rbx }}</p>
            <p class="mb-0 top-img__sub-text">
              {{ username }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-half-mobile">
      <div class="box">
        <div class="column__box column__box__blue">
          <div class="column__img">
            <img src="~assets/img/stock.png" />
          </div>
          <div class="column__text">
            <p class="mb-0 top-img__text">
              {{ stats.stock }}
            </p>
            <p class="mb-0 top-img__sub-text">Robux Stock</p>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-half-mobile">
      <div class="box">
        <div class="column__box column__box__green">
          <div class="column__img">
            <img src="~assets/img/online.png" />
          </div>
          <div class="column__text">
            <p class="mb-0 top-img__text">
              {{ stats.onlineUsers }}
            </p>
            <p class="mb-0 top-img__sub-text">Online Now</p>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-half-mobile">
      <div class="box">
        <div class="column__box column__box__pink">
          <div class="column__img">
            <img src="~assets/img/total.png" />
          </div>
          <div class="column__text">
            <p class="mb-0 top-img__text">
              {{ stats.paid }}
            </p>
            <p class="mb-0 top-img__sub-text">Total Paid</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="column box py-5 px-4 ml-2">
      <div class="is-flex is-align-items-center">
        <div class="top-img top-img__yellow">
          <img src="~assets/img/pic-2.png" />
        </div>
        <div class="ml-5">
          <p class="has-text-weight-bold mb-0 top-img__text">
            {{ stats.stock }}
          </p>
          <p class="has-text-weight-bold mb-0 top-img__sub-text">
            Robux Stock
          </p>
        </div>
      </div>
    </div>
    <div class="column box py-5 px-4 ml-2">
      <div class="is-flex is-align-items-center">
        <div class="top-img top-img__blue">
          <img src="~assets/img/pic-3.png" />
        </div>
        <div class="ml-5">
          <p class="has-text-weight-bold mb-0 top-img__text">
            {{ stats.onlineUsers }}
          </p>
          <p class="has-text-weight-bold mb-0 top-img__sub-text">
            Online Now
          </p>
        </div>
      </div>
    </div>
    <div class="column box py-5 px-4 ml-2" style="height: 130px;">
      <div class="is-flex is-align-items-center">
        <div class="top-img top-img__green">
          <img src="~assets/img/pic-4.png" />
        </div>
        <div class="ml-5">
          <p class="has-text-weight-bold mb-0 top-img__text">
            {{ stats.paid }}
          </p>
          <p class="has-text-weight-bold mb-0 top-img__sub-text">
            Total R$ Paid
          </p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
const STATS_API = 'users/stats'
const ONLINE_USERS_API = 'users/current-online'
export default {
  name: 'Statistics',
  layout: 'homeLayout',
  data() {
    return {
      username: this.$auth.user.username,
      rbxInterval: 0,
      onlineUsersInterval: 0
    }
  },
  computed: {
    stats() {
      return this.$store.state.stats
    }
  },
  created() {
    this.setStats()
    this.rbxInterval = setInterval(this.setStats, 6000)
    const randomInterval = Math.round(Math.random() * (60000 - 30000)) + 30000
    this.onlineUsersInterval = setInterval(async () => {
      const {onlineUsers} = await this.getOnlineUsers(ONLINE_USERS_API)
      this.$store.commit('stats/setOnlineUsers', onlineUsers)
    }, randomInterval)

    this.$store.commit('stats/setStatsIntervalId', {
      rbx: this.rbxInterval,
      users: this.onlineUsersInterval
    })
  },
  beforeDestroy() {
    clearInterval(this.rbxInterval)
    clearInterval(this.onlineUsersInterval)
  },
  methods: {
    async getStats() {
      const {rbx, totalPaid, totalStock} = await this.$axios.$get(STATS_API)
      return {
        rbx,
        totalPaid,
        totalStock
      }
    },
    async setStats() {
      const {rbx, totalPaid, totalStock} = await this.getStats()
      this.$store.commit('stats/setStats', {rbx, totalPaid, totalStock})
    },
    async getOnlineUsers() {
      const {onlineUsers} = await this.$axios.$get(ONLINE_USERS_API)
      return {
        onlineUsers
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.column {
  &__text {
    margin-left: 120px;
  }
}
.box {
  border-radius: 30px 30px 0px 30px;
  height: 112px;
  padding: 0;
  overflow: hidden;
}
.column__box {
  align-items: center;
  display: flex;
  position: relative;
  height: 100%;
  background: #f5ffe5;
  &__blue {
    background: #f0fefe;
  }
  &__green {
    background: #d4f3dd;
  }
  &__pink {
    background: #d1c9e0;
  }
}
.column__img {
  max-width: 250px;
  height: 100%;
  position: absolute;
  img {
    height: 100%;
  }
}
.top-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: red;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 75%;
  }
  &__text {
    font-size: 24px;
  }

  &__sub-text {
    color: #000;
    text-transform: capitalize;
  }

  &__red {
    background: linear-gradient(180deg, #f68059, #fb6432 142.14%);
    box-shadow: 0 2px 18px rgba(246, 128, 89, 0.4);
  }

  &__yellow {
    background: linear-gradient(180deg, #ffbf3a, #fb9536 142.14%);
    box-shadow: 0 2px 15px rgba(255, 191, 58, 0.4);
  }

  &__blue {
    background: linear-gradient(180deg, #459bff, #5f45ff 142.14%);
    box-shadow: 0 2px 18px rgba(69, 155, 255, 0.4);
  }

  &__green {
    background: linear-gradient(180deg, #11cd69, #34bf49 142.14%);
    box-shadow: 0 2px 25px rgba(17, 205, 105, 0.4);
  }
}

@media screen and (max-width: 550px) {
  .section {
    //padding: 3rem 1rem !important;
  }
  .column {
    .box {
    }
    &__img {
      bottom: 0;
      height: 50%;
    }
    &__text {
      margin-left: 55px;
    }
    .top-img {
      &__text {
        font-weight: 600;
        line-height: 39px;
        font-size: 20px;
      }
      &__sub-text {
        font-size: 14px;
        line-height: 21px;
      }
    }
  }
}
</style>
