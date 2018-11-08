import firebase from '~/plugins/firebase.js'
export default {
  namespaced: true,
  unsubscribe: null,
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
    loading(state) {
      state.isLoading = true
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
    startListener(context) {
      this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
        context.commit('loaded')
        context.commit('setUser', user)
      })
    },
    stopListener(context) {
      unsubscribe()
    },
  },
}
