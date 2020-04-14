const axios = require('axios')

export default {
  namespaced: true,
  state: {
    me: null
  },
  getters: {
    me(state) {
      return state.me ? state.me : {};
    }
  },
  mutations: {
    setMyInformation(state, me) {
      state.me = me
    }
  },
  actions: {
    async loadMyInformation({ commit }) {
      const response = axios.get('/me')
      commit('setMyInformation', response.data)
    }
  }
}