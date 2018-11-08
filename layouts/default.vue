<template lang="pug">
  v-app
    TheNavbar
    v-content
      v-container(fill-height)
        nuxt(v-if="isAuthed")
        SignIn(v-else)
</template>

<script>
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
  mounted() {
    this.$store.dispatch('auth/startListener')
  },
  destroyed() {
    this.$store.dispatch('auth/stopListener')
  },
}
</script>

<style scoped lang="sass">
</style>
