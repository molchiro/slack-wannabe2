import firebase from '~/plugins/firebase.js'
import format from 'date-fns/format'
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
    startListener(context) {
      let prevDate = null
      let thisDate = null
      this.unsubscribe = messagesRef
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              thisDate = format(change.doc.data().timestamp, 'YYYY-MM-DD')
              if (thisDate !== prevDate) {
                context.commit('push', {
                  type: 'dateDivider',
                  id: '@' + change.doc.id,
                  data: thisDate,
                })
              }
              context.commit('push', {
                type: 'message',
                id: change.doc.id,
                data: change.doc.data(),
              })
              prevDate = thisDate
            }
            if (change.type === 'modified') {
              // 編集を検知した時の処理
            }
            if (change.type === 'removed') {
              context.commit('pop', change.doc)
            }
          })
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
