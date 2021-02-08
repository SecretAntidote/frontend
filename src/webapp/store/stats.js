export const state = () => ({
  rbx: 0,
  paid: 0,
  stock: 0,
  onlineUsers: 200
})

export const mutations = {
  setStats(state, data) {
    state.rbx = data.rbx
    state.paid = data.totalPaid
    state.stock = data.totalStock
  },
  setOnlineUsers(state, onlineUsers) {
    state.onlineUsers = onlineUsers
  }
}
