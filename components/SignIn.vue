<template lang="pug">
  .container
    button.button.is-primary(
      @click="signIn"
      :class="{ 'is-loading': !isLoaded }"
    ) sign in
</template>

<script>
import { mapState } from 'vuex'
import firebase from '~/plugins/firebase.js'
const provider = new firebase.auth.GoogleAuthProvider()

export default {
  computed: mapState('auth', ['isLoaded']),
  methods: {
    signIn() {
      firebase.auth().signInWithRedirect(provider)
    },
  },
}
</script>

<style scoped lang="sass">
</style>
