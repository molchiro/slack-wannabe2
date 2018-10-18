export default {
  namespaced: true,
  state() {
    return {
      isLoaded: true,
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
    isLoaded: state => {
      return state.isLoaded
    },
  },
  actions: {
    AuthStateChanged(context, user) {
      context.commit('loaded')
      context.commit('setUser', user)
    },
  },
}