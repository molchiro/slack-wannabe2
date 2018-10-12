<template lang="pug">
  .container
    button.button(@click="signIn") sign in
</template>

<script>
import firebase from '~/plugins/firebase.js'
const provider = new firebase.auth.GoogleAuthProvider()

export default {
  methods: {
    signIn() {
      firebase.auth().signInWithRedirect(provider)
    },
  },
}
</script>

<style scoped lang="sass">
</style>
