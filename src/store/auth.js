export default {
    namespaced: true,
    state: {
      user: null
    },
    getters: {
      loggedIn (state) {
        return state.user !== null
      },
      user (state) {
        return state.user ? state.user : {}
      }
    },
    mutations: {
      login (state, user) {
        state.user = user
      },
      logout (state) {
        state.user = null
      }
    },
    actions: {
      authenticate ({ commit }, data) {
        commit('login', data)
      },
      logout ({ commit }) {
        commit('logout')
      }
    }
  }
  