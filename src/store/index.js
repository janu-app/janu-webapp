import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import me from './me'
import sessions from './sessions'
import classrooms from './classrooms'
import auth from './auth'
import areas from './areas'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    me,
    auth,
    sessions,
    classrooms,
    areas
  },
  plugins: [vuexLocal.plugin]
})
