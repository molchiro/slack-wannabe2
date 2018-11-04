<template lang="pug">
  v-bottom-sheet(inset v-model="sheet")
    v-btn(slot="activator" color='primary') 発言する
    v-textarea(solo v-model="content" placeholder="メッセージをどうぞ")
    v-btn(@click='postMessage') send
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      content: '',
      sheet: false,
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
      this.sheet = false
    },
  },
}
</script>

<style scoped lang="sass">
</style>
