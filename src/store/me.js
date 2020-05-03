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
      const isDirectivo = me.id == 'bd6b4cda-8a50-48d0-a7d7-3604275fc07b' || me.id == '1cb2d774-b6dd-434f-a6b2-3b1c2f2a477e'
      state.me = { ...me, permissions: {
          directivos: isDirectivo,
          salones: {
            asignar: isDirectivo
          }
        }
      }
    }
  },
  actions: {
    async loadMyInformation({ commit }) {
      const response = await axios.get('/me')
      commit('setMyInformation', response.data)
    }
  }
}