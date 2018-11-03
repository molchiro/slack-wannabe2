<template lang="pug">
  v-app
    TheNavbar
    v-content
      nuxt(v-if="isAuthed")
      SignIn(v-else)
</template>

<script>
import firebase from '~/plugins/firebase.js'
import TheNavbar from '~/components/TheNavbar'
import SignIn from '~/components/SignIn'
import { mapGetters } from 'vuex'
export default {
  components: {
    TheNavbar,
    SignIn,
  },
  computed: {
    ...mapGetters('auth', ['isAuthed']),
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch('auth/AuthStateChanged', user)
    })
  },
}
</script>

<style scoped lang="sass">
</style>
