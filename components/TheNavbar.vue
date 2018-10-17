<template lang="pug">
  .container
    ul
      li.app-title slack-wannabe2
      li.button(@click="signOut") sign out
      li.auth-username {{ authUserName }}
</template>

<script>
import firebase from '~/plugins/firebase.js'

export default {
  computed: {
    authUserName() {
      return this.$store.getters['auth/authUserName']
    },
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
