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
      const notify = (number, latestMessageContent) => {
        if ('Notification' in window) {
          const permission = Notification.permission
          if (permission === 'denied' || permission === 'granted') {
            // なんかする？
          }
          Notification.requestPermission().then(() => {
            const message =
              number > 1
                ? `新しい${number}件のメッセージ`
                : latestMessageContent
            const notification = new Notification(message)
          })
        }
      }
      this.unsubscribe = notificationsRef
        .where('userID', '==', rootState.auth.authedUser.uid)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added' || change.type === 'modified') {
              const data = change.doc.data()
              commit('change', data)
              if (data.notified === false) {
                notify(data.number, 'ここにメッセージ内容を入れる')
              }
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
