<template lang="pug">
  v-app
    TheNavbar
    v-content
      nuxt(v-if="isAuthed")
      v-container(v-else fill-height)
        SignIn
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
