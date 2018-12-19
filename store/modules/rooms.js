import firebase from '~/plugins/firebase.js'
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
const roomsRef = db.collection('rooms')

export default {
  namespaced: true,
  state() {
    return {
      rooms: [],
      selectedRoom: '7GgevlydJpzgema5UCJB',
    }
  },
  mutations: {
    initRooms(state) {
      state.rooms = []
    },
    addRoom(state, roomID) {
      state.rooms.push(roomID)
    },
  },
  actions: {
    initRooms({ commit, rootState }) {
      commit('initRooms')
      roomsRef
        .where('members', 'array-contains', rootState.auth.authedUser.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            commit('addRoom', { ...doc.data(), id: doc.id })
          })
        })
    },
  },
}
