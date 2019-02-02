<template lang="pug">
  v-toolbar(app clipped-left)
    v-toolbar-title slack-wannabe2
    v-spacer
    v-toolbar-items(v-if="isAuthed")
      v-layout(align-center justify-end fill-height) {{ authUserName }}
      v-btn(@click="signOut" flat) ログアウト
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import firebase from '~/plugins/firebase.js'

export default {
  computed: {
    ...mapGetters('auth', ['isAuthed']),
    ...mapState({
      authUserName: state => state.auth.authedUser.displayName,
    }),
  },
  methods: {
    signOut() {
      firebase.auth().signOut()
    },
  },
}
</script>

<style scoped lang="sass">
</style>
