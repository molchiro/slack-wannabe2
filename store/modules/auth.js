export default {
  namespaced: true,
  state() {
    return {
      isLoading: true,
      user: null,
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    loaded(state, status) {
      state.isLoading = false
    },
  },
  getters: {
    isAuthed: state => {
      return state.user !== null
    },
  },
  actions: {
    AuthStateChanged(context, user) {
      context.commit('loaded')
      context.commit('setUser', user)
    },
  },
}
