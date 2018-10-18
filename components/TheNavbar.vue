<template lang="pug">
  .container
    .app-title slack-wannabe2
    span(v-if="isAuthed")
      .button(@click="signOut") sign out
      .auth-username {{ authUserName }}
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
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
  .container
    display: table
  .app-title
    float: left
  .auth-username
    float: right
  .button
    float: right
</style>
