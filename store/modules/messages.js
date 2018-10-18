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
}
