<template lang="pug">
  v-layout(align-center justify-center)
    v-btn(
      :loading="isLoading"
      :disabled="isLoading"
      color="info"
      @click="signIn"
    ) サインイン
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState('auth', ['isLoading']),
  methods: {
    signIn() {
      this.$store.dispatch('auth/signIn')
    },
  },
}
</script>

<style scoped lang="sass">
</style>
