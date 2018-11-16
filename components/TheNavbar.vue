<template lang="pug">
  v-toolbar
    v-toolbar-title slack-wannabe2
    v-spacer
    v-toolbar-items(v-if="isAuthed")
      v-layout(align-center justify-end fill-height) {{ authUserName }}
      v-btn(@click="signOut" flat) sign out
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import firebase from '~/plugins/firebase.js'

export default {
  computed: {
    ...mapGetters('auth', ['isAuthed']),
    ...mapState({
      authUserName: state => state.auth.user.displayName,
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
