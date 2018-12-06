import firebase from '~/plugins/firebase.js'
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
const messagesRef = db.collection('messages')

export default {
  namespaced: true,
  unsubscribe: null,
  state() {
    return {
      messages: [],
    }
  },
  mutations: {
    push(state, message) {
      state.messages.push(message)
    },
    pop(state, message) {
      const targetMessageIndex = state.messages.findIndex(
        x => x.id === message.id
      )
      state.messages.splice(targetMessageIndex, 1)
    },
  },
  actions: {
    startListener({ commit, rootState }) {
      let isFirstLoad = true
      const isNewMessage = doc => {
        return doc.data().timestamp > rootState.auth.authedUser.readUntil
      }
      const notifyNewMessage = () => {
        if ('Notification' in window) {
          const permission = Notification.permission

          if (permission === 'denied' || permission === 'granted') {
            // なんかする？
          }

          Notification.requestPermission().then(() => {
            const notification = new Notification('新しいメッセージ')
          })
        }
      }
      const pushMessage = doc => {
        commit('push', {
          id: doc.id,
          data: doc.data(),
        })
      }
      this.unsubscribe = messagesRef
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
          if (isFirstLoad) {
            isFirstLoad = false
            snapshot.forEach(doc => {
              pushMessage(doc)
            })
            if (isNewMessage(snapshot.docs[snapshot.docs.length - 1])) {
              notifyNewMessage()
            }
          } else {
            snapshot.docChanges().forEach(change => {
              if (change.type === 'added') {
                pushMessage(change.doc)
                if (isNewMessage(change.doc)) {
                  notifyNewMessage()
                }
              }
              if (change.type === 'modified') {
                // 編集を検知した時の処理
              }
              if (change.type === 'removed') {
                commit('pop', change.doc)
              }
            })
          }
        })
    },
    stopListener(context) {
      this.unsubscribe()
    },
    add(context, message) {
      messagesRef.add(message)
    },
    delete(context, message) {
      messagesRef.doc(message.id).delete()
    },
  },
}
