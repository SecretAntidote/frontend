export const state = () => ({
  rbx: 0,
  onlineUsers: 200
})

export const mutations = {
  setRbx (state, rbx) {
    state.rbx = rbx
  },
  setOnlineUsers (state, onlineUsers) {
    state.onlineUsers = onlineUsers
  }
}
