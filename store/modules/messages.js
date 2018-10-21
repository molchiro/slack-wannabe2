import firebase from '~/plugins/firebase.js'
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
const messagesRef = db.collection('messages')

export default {
  namespaced: true,
  state() {
    return {
      messages: [],
    }
  },
  mutations: {
    push(state, message) {
      state.messages.push(message)
    },
    // pop(state, message) {
    //   const targetMessageIndex = state.messages.findIndex(
    //     x => x.key === message.key
    //   )
    //   state.messages.splice(targetMessageIndex, 1)
    // },
  },
  actions: {
    startListeners(context) {
      db.collection('messages').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            context.commit('push', {
              key: change.doc.id,
              val: change.doc.data(),
            })
          }
          if (change.type === 'modified') {
            // 編集を検知した時の処理
          }
          if (change.type === 'removed') {
            // context.commit('pop', removedMessage)
          }
        })
      })
    },
    stopListeners(context) {
      // messagesRef.off()
    },
    push(context, message) {
      // messagesRef.set(message)
    },
    remove(context, message) {
      // messagesRef.child(message.key).remove()
    },
  },
}
