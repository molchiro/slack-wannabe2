import firebase from '~/plugins/firebase.js'
const messagesRef = firebase.database().ref('messages')

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
    pop(state, message) {
      const targetMessageIndex = state.messages.findIndex(
        x => x.key === message.key
      )
      state.messages.splice(targetMessageIndex, 1)
    },
  },
  actions: {
    startListeners(context) {
      messagesRef.on('child_added', snapshot => {
        context.commit('push', {
          key: snapshot.key,
          val: snapshot.val(),
        })
      })
      messagesRef.on('child_removed', removedMessage => {
        context.commit('pop', removedMessage)
      })
    },
    stopListeners(context) {
      messagesRef.off()
    },
    push(context, message) {
      messagesRef.push(message)
    },
    remove(context, message) {
      messagesRef.child(message.key).remove()
    },
  },
}
