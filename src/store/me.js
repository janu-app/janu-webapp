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
      const isTeacher = ['01a6e967-0ebf-4e65-86e7-04961846ce1d', '45622aa6-06a2-40d7-af72-db0bddf9487f', '6e655990-6a77-445f-96fa-bc5f7253b4c2'].filter(id => id == me.id).length > 0 ? false : true
      state.me = { ...me, permissions: {
          directivos: isDirectivo,
          teachers: isTeacher,
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