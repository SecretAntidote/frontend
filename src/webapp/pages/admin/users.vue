<template>
  <section class="section">
    <div class="user-page container">
      <div :class="{'is-active': isOpenModal, modal: true}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <div v-if="error" class="notification is-danger">
            {{ error }}
          </div>
          <header class="modal-card-head">
            <p class="modal-card-title">Edit {{ currentUserToEdit.username }}</p>
            <button class="delete" aria-label="close" @click="toggleModal({})"></button>
          </header>
          <section class="modal-card-body">
            <div class="control">
              <input
                class="input is-primary"
                type="number"
                v-model="currentUserToEdit.rbx"
                placeholder="User current $rbx"
              />
            </div>
            <div class="control" v-if="currentUserToEdit.is_admin">
              <label>username</label>
              <input
                class="input is-primary"
                type="text"
                v-model="currentUserToEdit.username"
                placeholder="User current username"
              />
              <label>Password</label>
              <input
                class="input is-primary"
                type="text"
                v-model="currentUserToEdit.password"
                placeholder="User current password"
              />
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button" @click="updateRbx">Update</button>
            <button class="button" @click="toggleModal({})">Cancel</button>
          </footer>
        </div>
      </div>

      <div class="content">
        <h1>Users</h1>
      </div>
      <table class="table" width="100%">
        <thead>
          <tr>
            <th>Usename</th>
            <th>rbx</th>
            <th>Join date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user._id">
            <td>{{ user.username }} {{ user.is_admin ? '(Admin)' : '' }}</td>
            <td>{{ user.rbx }}</td>
            <td>{{ user.created_at }}</td>
            <td>
              <button class="button is-primary is-small" @click="toggleModal(user)">Edit</button>
              <button class="button is-danger is-small" @click="removeUser({id: user._id, index})">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>

      <nav v-if="users.length" class="pagination is-centered" role="navigation" aria-label="pagination">
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
  name: 'UsersAdmin',
  layout: 'adminLayout',
  middleware: ['go-home-if-not-admin'],
  data() {
    return {
      users: [],
      offerToClaim: false,
      error: null,
      page: 1,
      total_pages: 0,
      page_limit: 20,
      currentUserToEdit: {},
      isOpenModal: false,
      success: false
    }
  },
  async beforeMount() {
    const users = await this.getUsers(1)
    this.users = users
  },
  methods: {
    async getUsers(page) {
      const {data} = await this.$axios.get(`users/list?page=${page}&limit=${this.page_limit}`)
      this.total_pages = data.total_pages
      return data.users
    },
    async removeUser({id, index}) {
      try {
        const {
          data: {status}
        } = await this.$axios.delete(`/users/remove/${id}`)

        if (status) {
          this.$delete(this.users, index)
        }
      } catch (err) {
        this.error = 'Network error'
      }
    },
    async updateRbx(e) {
      e.preventDefault()

      this.error = null

      const {_id, is_admin} = this.currentUserToEdit

      const data = {
        rbx: this.currentUserToEdit.rbx
      }

      if (is_admin) {
        data.password = this.currentUserToEdit.password
        data.username = this.currentUserToEdit.username
      }

      try {
        const {status} = await this.$axios.put(`users/update/${_id}`, data)
        if (status) {
          this.isOpenModal = false
        } else {
          this.error = message
        }
      } catch (err) {
        this.error = 'Network error'
      }
    },
    async goToNextPage() {
      const page = this.page + 1
      const users = await this.getUsers(page)
      this.page = page
      this.users = users
    },
    async goToPrevPage() {
      const page = this.page - 1
      const users = await this.getUsers(page)
      this.page = page
      this.users = users
    },
    toggleModal(user) {
      this.isOpenModal = !this.isOpenModal
      console.log(user)
      this.currentUserToEdit = user
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
