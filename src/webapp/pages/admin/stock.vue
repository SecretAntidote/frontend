<template>
  <section class="section">
    <div class="promo-page container">
      <div class="content">
        <h1>Stocks</h1>
        <div v-if="success" class="notification is-success">Updated</div>
        <form class="card-form field is-grouped mt-5 mb-4 pt-3">
          <div class="control is-expanded">
            <input v-if="stocks" class="input" v-model="stocks" type="text" required id="code-input" />
            <div v-else>Loading ...</div>
            <span class="line"></span>
          </div>
          <p class="control">
            <button @click="updateStocks" class="button is-primary submit-btn has-text-weight-semibold is-uppercase">
              Update
            </button>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'StocksAdmin',
  layout: 'adminLayout',
  data() {
    return {
      stocks: null,
      success: false
    }
  },
  async beforeMount() {
    const {
      stock: {stocks_total}
    } = await this.getStocks()
    this.stocks = stocks_total
  },
  methods: {
    async getStocks() {
      const response = await this.$axios.get('stocks')
      return response.data
    },
    async updateStocks(e) {
      e.preventDefault()

      const data = {
        stocks_total: this.stocks
      }

      try {
        const {
          data: {success}
        } = await this.$axios.post('stocks', data)

        this.success = success
      } catch (err) {}
    }
  }
}
</script>
