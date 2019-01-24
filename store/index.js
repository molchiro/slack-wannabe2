import Vuex from 'vuex'
import auth from './modules/auth'
import messages from './modules/messages'
import rooms from './modules/rooms'
import notifications from './modules/notifications'

const store = () =>
  new Vuex.Store({
    modules: {
      auth,
      messages,
      rooms,
      notifications,
    },
  })

export default store
