import firebase from '~/plugins/firebase.js'
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
const provider = new firebase.auth.GoogleAuthProvider()
export default {
  namespaced: true,
  unsubscribe: null,
  state() {
    return {
      isLoading: true,
      authedUser: null,
    }
  },
  mutations: {
    setUser(state, user) {
      state.authedUser = user
    },
    loading(state) {
      state.isLoading = true
    },
    loaded(state, status) {
      state.isLoading = false
    },
  },
  getters: {
    isAuthed: state => {
      return state.authedUser !== null
    },
  },
  actions: {
    signIn(context) {
      context.commit('loading')
      firebase.auth().signInWithRedirect(provider)
    },
    startListener(context) {
      this.unsubscribe = firebase.auth().onAuthStateChanged(authedUser => {
        const authedUsersRef = db.doc(`users/${authedUser.uid}`)
        const setUserData = {
          displayName: authedUser.displayName,
          lastVisitedAt: new Date().getTime(),
        }
        authedUsersRef.set(setUserData, {merge: true}).then(() => {
          context.commit('setUser', {
            ...setUserData,
            uid: authedUser.uid,
          })
          context.commit('loaded')
        })
      })
    },
    stopListener(context) {
      unsubscribe()
    },
  },
}
