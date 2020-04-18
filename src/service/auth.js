import store from '@/store'
import router from '@/router'
import * as firebase from 'firebase/app'
import 'firebase/auth'

import axios from 'axios'

class Auth {

  async createUser({ email, password }) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (e) {
      throw new Error('No se pudo crear al usuario')
    }
  }

  async login(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.onAuthStateChanged(user).then(() => {
        unsubscribe()
      })
    })
  }

  onAuthStateChanged(user) {
    if (user) {
      const { displayName, email } = user
      return firebase.auth().currentUser.getIdToken(true)
        .then((idToken) => {
          console.log(idToken)
          axios.defaults.headers.common = {'Authorization': `Bearer ${idToken}`}
          return store.dispatch('auth/authenticate', {
            name: displayName ? displayName : 'Jhon Doe',
            email,
            idToken
          }).then(() => {
            return store.dispatch('me/loadMyInformation').then(() => {
              console.log('loaded me')
              if (router.currentRoute.name == 'login' || router.currentRoute.name == 'join')
                router.push({ name: 'home' })
            })
          })
        }).catch(e => {
          console.log(e)
        })
    } else {
      console.log('No user found')
      router.push({ name: 'login' })
      return store.dispatch('auth/logout')
    }
  }

  googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  isLoggedIn() {
    return store.getters['auth/loggedIn'];
  }
}

export default new Auth()
