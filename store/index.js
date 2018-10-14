import Vuex from 'vuex'

const store = () =>
  new Vuex.Store({
    state: {
      auth: {
        isLoaded: true,
        user: null,
      },
    },
    mutations: {
      setUser(state, user) {
        state.auth.user = user
      },
      loaded(state, status) {
        state.auth.isLoading = false
      },
    },
    getters: {
      isAuthed: state => {
        return state.auth.user !== null
      },
      isLoaded: state => {
        return state.auth.isLoaded
      },
      user: state => {
        return state.auth.user
      },
    },
    actions: {
      AuthStateChanged(context, user) {
        context.commit('loaded')
        context.commit('setUser', user)
      },
    },
  })

export default store
