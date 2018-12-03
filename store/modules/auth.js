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
    readUntil(state, messageCreatedAt) {
      state.authedUser.readUntil = messageCreatedAt
    },
    loading(state) {
      state.isLoading = true
    },
    loaded(state) {
      state.isLoading = false
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
    readUntil({ commit, state }, messageCreatedAt) {
      commit('readUntil', messageCreatedAt)
      db.doc(`users/${state.authedUser.uid}`).set(
        { readUntil: messageCreatedAt },
        { merge: true }
      )
    },
    startListener({ commit }) {
      this.unsubscribe = firebase.auth().onAuthStateChanged(authedUser => {
        if (authedUser) {
          const authedUsersRef = db.doc(`users/${authedUser.uid}`)
          authedUsersRef
            .get()
            .then(doc => {
              let userData = {}
              if (!doc.exists) {
                userData = {
                  displayName: authedUser.displayName,
                  firstVisitAt: new Date().getTime(),
                  readUntil: 0,
                }
                doc.ref.set(userData)
              } else {
                userData = doc.data()
              }
              return Promise.resolve(userData)
            })
            .then(userData => {
              commit('setUser', {
                ...userData,
                uid: authedUser.uid,
              })
              authedUsersRef.set(
                { lastVisitAt: new Date().getTime() },
                { merge: true }
              )
              commit('loaded')
            })
        } else {
          commit('setUser', null)
          commit('loaded')
        }
      })
    },
    stopListener(context) {
      unsubscribe()
    },
  },
}
