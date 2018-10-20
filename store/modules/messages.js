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
    pushMessage(state, message) {
      state.messages.push(message)
    },
    removeMessage(state, message) {
      const targetMessageIndex = state.messages.findIndex(
        x => x.key === message.key
      )
      state.messages.splice(targetMessageIndex, 1)
    },
  },
  actions: {
    startListeners(context) {
      messagesRef.on('child_added', snapshot => {
        context.commit('pushMessage', {
          key: snapshot.key,
          val: snapshot.val(),
        })
      })
      messagesRef.on('child_removed', removedMessage => {
        context.commit('removeMessage', removedMessage)
      })
    },
    stopListeners(context) {
      messagesRef.off()
    },
  },
}
