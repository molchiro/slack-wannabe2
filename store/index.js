import Vuex from 'vuex'
import auth from './modules/auth'
import messages from './modules/messages'

const store = () =>
  new Vuex.Store({
    modules: {
      auth,
      messages,
    },
  })

export default store
