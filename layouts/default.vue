<template lang="pug">
  v-app
    TheSidebar(
      v-if="isAuthed"
      :show="sidebarShow"
      @sidebarShowChanged="sidebarShowChanged"
      )
    TheNavbar(@toggleSidebar="toggleSidebar")
    v-content
      nuxt(v-if="isAuthed")
      v-container(v-else fill-height)
        SignIn
</template>

<script>
import TheSidebar from '~/components/TheSidebar'
import TheNavbar from '~/components/TheNavbar'
import SignIn from '~/components/SignIn'
import { mapGetters } from 'vuex'
export default {
  components: {
    TheSidebar,
    TheNavbar,
    SignIn,
  },
  data() {
    return {
      sidebarShow: true,
    }
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
  methods: {
    toggleSidebar() {
      this.sidebarShow = !this.sidebarShow
    },
    sidebarShowChanged(status) {
      this.sidebarShow = status
    },
  },
}
</script>

<style scoped lang="sass">
</style>
