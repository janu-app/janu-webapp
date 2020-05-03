import Vue from 'vue'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import VueFeather from 'vue-feather'
import VueTheMask from 'vue-the-mask'

import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';

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
Vue.use(VueTheMask)
Vue.use(VueFeather)

Sentry.init({
  release: `janu-webapp@'0.0.2'}`,
  dsn: 'https://2f2bc3d65e1542e7880be71c0dfc734d@o379917.ingest.sentry.io/5205265',
  integrations: [new VueIntegration({Vue, attachProps: true})],
});

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

