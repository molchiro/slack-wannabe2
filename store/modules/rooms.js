import firebase from '~/plugins/firebase.js'
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
const roomsRef = db.collection('rooms')

export default {
  namespaced: true,
  state() {
    return {
      rooms: [],
      selectedRoomID: '',
    }
  },
  mutations: {
    initialize(state) {
      state.rooms = []
    },
    push(state, roomID) {
      state.rooms.push(roomID)
    },
    select(state, roomID) {
      state.selectedRoomID = roomID
    },
  },
  actions: {
    async initRooms({ commit, rootState }) {
      commit('initialize')
      const roomsSnap = await roomsRef
        .where('members', 'array-contains', rootState.auth.authedUser.uid)
        .get()
      roomsSnap.forEach(doc => {
        commit('push', {
          ...doc.data(),
          id: doc.id,
        })
      })
    },
    selectRoom({ commit }, roomID) {
      commit('select', roomID)
    },
  },
}
