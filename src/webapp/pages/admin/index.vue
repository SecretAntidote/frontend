<template>
  <section class="section">
    <div class="promo-page container">
      <div class="content">
        <h1>Promos</h1>
        <div v-if="error" class="notification is-danger">
          {{ error }}
        </div>
        <form class="card-form field is-grouped mt-5 mb-4 pt-3">
          <div class="control is-expanded">
            <input class="input" v-model="code" type="text" required id="code-input" />

            <label for="max-input">Promo code (example: love_is_hard)</label>
            <span class="line"></span>
          </div>
          <div class="control is-expanded">
            <input class="input" v-model="maxUsers" type="number" required id="max-input" />

            <label for="max-input">Max users to use this code</label>
            <span class="line"></span>
          </div>
          <div class="control is-expanded">
            <input class="input" v-model="rbx" type="number" required id="rbx-input" />

            <label for="rbx-input">Enter R$ to earn from this promo code</label>
            <span class="line"></span>
          </div>

          <div class="control is-expanded">
            <input class="checkbox" v-model="offerToClaim" type="checkbox" id="offer-input" />

            <label for="offer-input">Require offer to claim</label>
            <span class="line"></span>
          </div>
          <p class="control">
            <button @click="createPromo" class="button is-primary submit-btn has-text-weight-semibold is-uppercase">
              Add
            </button>
          </p>
        </form>
      </div>
      <table class="table" width="100%">
        <thead>
          <tr>
            <th>Code</th>
            <th>rbx</th>
            <th>Max users</th>
            <th>Used by</th>
            <th>Require offer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(promo, index) in promos" :key="promo._id">
            <td>{{ promo.code }}</td>
            <td>{{ promo.rbx }}</td>
            <td>{{ promo.max_users }}</td>
            <td>{{ promo.used_by.length }}</td>
            <td>
              <input
                type="checkbox"
                @change="toggleOfferToClaim(promo.is_offer_to_claim, promo._id)"
                :checked="promo.is_offer_to_claim ? true : false"
              />
              <label>Require offer to claim</label>
            </td>
            <td>
              <button class="button is-danger is-small" @click="removePromo({id: promo._id, index})">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>

      <nav v-if="promos.length" class="pagination is-centered" role="navigation" aria-label="pagination">
        <a @click="goToPrevPage" class="pagination-previous" v-if="page > 1">Previous</a>
        <a @click="goToNextPage" class="pagination-next" v-if="total_pages > 1 && page !== total_pages">Next page</a>
        <ul class="pagination-list">
          <li>{{ page }}/{{ total_pages }}</li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PromosAdmin',
  layout: 'adminLayout',
  middleware: ['go-home-if-not-admin'],
  data() {
    return {
      promos: [],
      code: '',
      rbx: '',
      maxUsers: '',
      offerToClaim: false,
      error: null,
      page: 1,
      total_pages: 0,
      page_limit: 20,
      success: false
    }
  },
  async beforeMount() {
    const promos = await this.getpromos(1)
    this.promos = promos
  },
  methods: {
    async toggleOfferToClaim (isOfferToClaim, id) {
      try {
        await this.$axios.put(`promo/${id}`, {
          is_offer_to_claim: !isOfferToClaim
        })
      } catch (err) {
        this.error = 'Error updating promo'
      }
    },
    async getpromos(page) {
      const {data} = await this.$axios.get(`promo/list?page=${page}&limit=${this.page_limit}`)
      this.total_pages = data.total_pages
      return data.promos
    },
    async goToNextPage() {
      const page = this.page + 1
      const promos = await this.getpromos(page)
      this.page = page
      this.promos = promos
    },
    async goToPrevPage() {
      const page = this.page - 1
      const promos = await this.getpromos(page)
      this.page = page
      this.promos = promos
    },
    async createPromo(e) {
      e.preventDefault()

      this.error = null

      const data = {
        code: this.code,
        rbx: this.rbx,
        max_users: this.maxUsers,
        offerToClaim: this.offerToClaim
      }

      try {
        const {
          data: {status, message, promo}
        } = await this.$axios.post('promo/create', data)
        if (status) {
          this.promos.unshift(promo)

          this.code = ''
          this.rbx = ''
          this.maxUsers = ''
          this.offerToClaim = false
        } else {
          this.error = message
        }
      } catch (err) {
        this.error = 'Network error'
      }
    },
    async removePromo({id, index}) {
      try {
        const {
          data: {status}
        } = await this.$axios.delete(`/promo/remove/${id}`)

        if (status) {
          this.$delete(this.promos, index)
        }
      } catch (err) {
        this.error = 'Network error'
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
