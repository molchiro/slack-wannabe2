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
    loadedUser(state, user) {
      state.authedUser = user
      state.isLoading = false
    },
    loading(state) {
      state.isLoading = true
    },
  },
  getters: {
    isAuthed: state => {
      return state.authedUser !== null
    },
  },
  actions: {
    signIn({ commit }) {
      commit('loading')
      firebase.auth().signInWithRedirect(provider)
    },
    startListener({ commit }) {
      const createNewUser = (authedUser, doc) => {
        const userData = {
          displayName: authedUser.displayName,
          firstVisitAt: new Date().getTime(),
        }
        doc.ref.set(userData)
        return userData
      }

      this.unsubscribe = firebase
        .auth()
        .onAuthStateChanged(async authedUser => {
          if (!authedUser) {
            commit('loadedUser', null)
            return
          }
          let userData = {}
          const authedUserRef = db.doc(`users/${authedUser.uid}`)
          const authedUserSnap = await authedUserRef.get()
          if (!authedUserSnap.exists) {
            userData = createNewUser(authedUser, authedUserSnap)
          } else {
            userData = authedUserSnap.data()
          }
          commit('loadedUser', {
            ...userData,
            uid: authedUser.uid,
          })
          authedUserRef.set(
            { lastVisitAt: new Date().getTime() },
            { merge: true }
          )
        })
    },
    stopListener(context) {
      unsubscribe()
    },
  },
}
