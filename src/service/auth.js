import * as Sentry from '@sentry/browser';
import store from '@/store'
import router from '@/router'
import * as firebase from 'firebase/app'
import 'firebase/auth'

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
      Sentry.configureScope(function(scope) {
        scope.setUser({ email });
      });
      
      return firebase.auth().currentUser.getIdToken(true)
        .then((idToken) => {
          // axios.defaults.headers.common = {'Authorization': `Bearer ${idToken}`}
          return store.dispatch('auth/authenticate', {
            name: displayName ? displayName : 'Jhon Doe',
            email,
            idToken
          }).then(() => {
            return store.dispatch('me/loadMyInformation').then(() => {
              if (router.currentRoute.name == 'login' || router.currentRoute.name == 'join')
                router.push({ name: 'home' })
            })
          })
        }).catch(e => {
          Sentry.captureException(e)
        })
    } else {
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
