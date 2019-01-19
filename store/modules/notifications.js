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
      const notify = message => {
        if ('Notification' in window) {
          const permission = Notification.permission
          if (permission === 'denied' || permission === 'granted') {
            // なんかする？
          }
          Notification.requestPermission().then(() => {
            const notification = new Notification(message)
          })
        }
      }
      let isFirstLoad = true
      this.unsubscribe = notificationsRef
        .where('userID', '==', rootState.auth.authedUser.uid)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added' || change.type === 'modified') {
              const data = change.doc.data()
              const notificationsID = change.doc.id
              commit('change', { ...data, notificationsID })
              if (!isFirstLoad && data.number > 0) {
                notify(data.content)
              }
            }
          })
          isFirstLoad = false
        })
    },
    stopListener({ commit }) {
      this.unsubscribe()
      commit('initialize')
    },
    checked({ state, rootState }) {
      const selectedRoomID = rootState.rooms.selectedRoomID
      const notifications = state.notifications
      const notificationID = notifications[selectedRoomID].notificationsID
      notificationsRef.doc(notificationID).set(
        {
          checkedAt: new Date().getTime(),
          number: 0,
        },
        {
          merge: true,
        }
      )
    },
  },
}
