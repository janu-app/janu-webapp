export default {
    namespaced: true,
    state: {
      user: null
    },
    getters: {
      loggedIn (state) {
        return state.user !== null
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
      authenticate ({ commit }, { name, email}) {
        commit('login', { name, email })
      },
      logout ({ commit }) {
        commit('logout')
      }
    }
  }
  