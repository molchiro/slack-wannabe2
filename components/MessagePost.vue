<template lang="pug">
  .container
    textarea.textarea(v-model="content")
    .button(@click='postMessage') send
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      content: '',
    }
  },
  computed: mapState({
    user: state => state.auth.user,
  }),
  methods: {
    postMessage() {
      if (!this.content) {
        return
      }
      this.$store.dispatch('messages/add', {
        uid: this.user.uid,
        timestamp: new Date().getTime(),
        displayName: this.user.displayName,
        content: this.content,
      })
      this.content = ''
    },
  },
}
</script>

<style scoped lang="sass">
</style>
