import firebase from '~/plugins/firebase.js'
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
const messagesRef = db.collection('messages')

export default {
  namespaced: true,
  unsubscribe: null,
  state() {
    return {
      messages: [],
    }
  },
  mutations: {
    initialize(state) {
      state.messages = []
    },
    push(state, message) {
      state.messages.push(message)
    },
    pop(state, message) {
      const targetMessageIndex = state.messages.findIndex(
        x => x.id === message.id
      )
      state.messages.splice(targetMessageIndex, 1)
    },
  },
  actions: {
    startListener({ commit, rootState }) {
      this.unsubscribe = messagesRef
        .where('roomID', '==', rootState.rooms.selectedRoomID)
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              commit('push', {
                id: change.doc.id,
                data: change.doc.data(),
              })
            } else if (change.type === 'modified') {
              // 編集を検知した時の処理
            } else if (change.type === 'removed') {
              commit('pop', change.doc)
            }
          })
        })
    },
    stopListener({ commit }) {
      this.unsubscribe()
      commit('initialize')
    },
    add({ commit, rootState }, content) {
      messagesRef.add({
        uid: rootState.auth.authedUser.uid,
        timestamp: new Date().getTime(),
        displayName: rootState.auth.authedUser.displayName,
        content: content,
        roomID: rootState.rooms.selectedRoomID,
      })
    },
    delete(context, message) {
      messagesRef.doc(message.id).delete()
    },
  },
}
