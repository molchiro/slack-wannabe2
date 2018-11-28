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
    readUntil(context, messageCreatedAt) {
      db.doc(`users/${context.state.authedUser.uid}`)
        .set({ readUntil: messageCreatedAt }, { merge: true })
        .then(() => {
          context.commit('readUntil', messageCreatedAt)
        })
    },
    startListener(context) {
      this.unsubscribe = firebase.auth().onAuthStateChanged(authedUser => {
        const authedUsersRef = db.doc(`users/${authedUser.uid}`)
        authedUsersRef.get().then(doc => {
          let userData = {}
          if (!doc.exists) {
            userData ={
              displayName: authedUser.displayName,
              firstVisitAt: new Date().getTime(),
              readUntil: 0,
            }
            doc.ref.set(userData)
          } else {
            userData = doc.data()
          }
          return Promise.resolve(userData)
        }).then(userData => {
          context.commit('setUser', {
            ...userData,
            uid: authedUser.uid,
          })
          context.commit('loaded')
          authedUsersRef.set({lastVisitAt: new Date().getTime(),}, { merge: true })
        })
      })
    },
    stopListener(context) {
      unsubscribe()
    },
  },
}
