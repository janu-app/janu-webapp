import axios from 'axios'
import * as firebase from 'firebase/app'
import 'firebase/auth'

axios.defaults.baseURL = {
  'development': 'http://localhost:3000',
  'staging': 'https://janu.yian.org.pe',
  'production': 'https://janu.yian.org.pe',
  //'production': 'https://api.janu.org.pe'
}[process.env.NODE_ENV || 'development']

axios.interceptors.request.use(async function (config) {
  const idToken = await firebase.auth().currentUser.getIdToken()
  config.headers.authorization = `Bearer ${idToken}`
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default axios