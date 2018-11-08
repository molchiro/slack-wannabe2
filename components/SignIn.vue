<template lang="pug">
  v-layout
    v-btn(
      @click="signIn"
      :class="{ 'is-loading': isLoading }"
    ) sign in
</template>

<script>
import { mapState } from 'vuex'
import firebase from '~/plugins/firebase.js'
const provider = new firebase.auth.GoogleAuthProvider()

export default {
  computed: mapState('auth', ['isLoading']),
  methods: {
    signIn() {
      firebase.auth().signInWithRedirect(provider)
    },
  },
}
</script>

<style scoped lang="sass">
</style>
