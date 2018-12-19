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
    initialize(state) {
      state.messages = []
    },
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
        .where('roomID', '==', rootState.rooms.selectedRoomID)
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
          if (isFirstLoad) {
            isFirstLoad = false
            if (snapshot.empty) {
              return
            }
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
    stopListener({ commit }) {
      this.unsubscribe()
      commit('initialize')
    },
    add({ commit, rootState }, content) {
      messagesRef.add({
        uid: rootState.auth.authedUser.uid,
        timestamp: new Date().getTime(),
        displayName: rootState.auth.authedUser.displayName,
        content: content,
        roomID: rootState.rooms.selectedRoomID,
      })
    },
    delete(context, message) {
      messagesRef.doc(message.id).delete()
    },
  },
}
