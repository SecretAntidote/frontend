export const state = () => ({
  rbx: 0,
  onlineUsers: 200,
  intervalId: null
})

export const mutations = {
  setRbx (state, rbx) {
    state.rbx = rbx
  },
  setOnlineUsers (state, onlineUsers) {
    state.onlineUsers = onlineUsers
  },
  setStatsIntervalId (state, intervalId) {
    state.intervalId = intervalId
  }
}
