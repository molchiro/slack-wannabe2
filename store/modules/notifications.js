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
      const createMessage = async (number, latestMessageID, roomID) => {
        if (number > 1) {
          return `新しい${number}件のメッセージ`
        } else {
          const messageSnap = await db.doc(`messages/${latestMessageID}`).get()
          const roomSnap = await db.doc(`rooms/${roomID}`).get()
          const roomName = roomSnap.data().name
          const auther = messageSnap.data().displayName
          const content = messageSnap.data().content
          return `[${auther}@${roomName}]${content}`
        }
      }
      const notified = notificationId => {
        db.doc(`notifications/${notificationId}`).set(
          {
            notified: true,
          },
          { merge: true }
        )
      }
      this.unsubscribe = notificationsRef
        .where('userID', '==', rootState.auth.authedUser.uid)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added' || change.type === 'modified') {
              const data = change.doc.data()
              commit('change', data)
              if (data.notified === false) {
                createMessage(
                  data.number,
                  data.latestMessageID,
                  data.roomID
                ).then(message => {
                  notify(message)
                  notified(change.doc.id)
                })
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
