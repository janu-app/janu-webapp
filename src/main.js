import Vue from 'vue'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import VueFeather from 'vue-feather'

import './config'

import * as firebase from "firebase/app"

import auth from './service/auth'

import store from './store'
import router from './router'
import App from './App.vue'

import './assets/styles/theme.sass'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Vuelidate)
Vue.use(VueFeather)

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  auth.onAuthStateChanged(user).then(() => {
    new Vue({
      store,
      router,
      render: h => h(App),
    }).$mount('#app')
    unsubscribe()
  })
})

