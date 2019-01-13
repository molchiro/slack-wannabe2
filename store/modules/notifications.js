import firebase from '~/plugins/firebase.js'
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
const notificationsRef = db.collection('notifications')

export default {
  namespaced: true,
  unsubscribe: null,
  state() {
    return {
      notifications: {},
    }
  },
  mutations: {
    initialize(state) {
      state.notifications = {}
    },
    change(state, payload) {
      state.notifications[payload.roomID] = payload
    },
  },
  actions: {
    startListener({ commit, rootState }) {
      this.unsubscribe = notificationsRef
        .where('userID', '==', rootState.auth.authedUser.uid)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added' || change.type === 'modified') {
              commit('change', change.doc.data())
            }
          })
        })
    },
    stopListener({ commit }) {
      this.unsubscribe()
      commit('initialize')
    },
  },
}
