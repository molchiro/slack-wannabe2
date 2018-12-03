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
      this.unsubscribe = messagesRef
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              commit('push', {
                id: change.doc.id,
                data: change.doc.data(),
              })
              if (
                change.doc.data().timestamp >
                rootState.auth.authedUser.readUntil
              ) {
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
            }
            if (change.type === 'modified') {
              // 編集を検知した時の処理
            }
            if (change.type === 'removed') {
              commit('pop', change.doc)
            }
          })
        })
    },
    stopListener(context) {
      this.unsubscribe()
    },
    add(context, message) {
      console.log(context)
      messagesRef.add(message)
    },
    delete(context, message) {
      messagesRef.doc(message.id).delete()
    },
  },
}
