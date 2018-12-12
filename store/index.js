import Vuex from 'vuex'
import auth from './modules/auth'
import messages from './modules/messages'
import rooms from './modules/rooms'

const store = () =>
  new Vuex.Store({
    modules: {
      auth,
      messages,
      rooms,
    },
  })

export default store
