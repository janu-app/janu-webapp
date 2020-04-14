const axios = require('axios')

export default {
  namespaced: true,
  state: {
    areas: null
  },
  getters: {
    areas(state) {
      return state.areas ? state.areas : {};
    }
  },
  mutations: {
    setAreas(state, areas) {
      state.areas = areas
    }
  },
  actions: {
    async loadAreas({ commit }) {
      const response = await axios.get('/areas')
      commit('setAreas', response.data.results)
    }
  }
}