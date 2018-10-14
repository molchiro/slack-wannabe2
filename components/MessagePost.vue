<template lang="pug">
  .container
    textarea.textarea(v-model="content")
    .button(@click='post') send
</template>

<script>
import firebase from '~/plugins/firebase.js'
const messagesRef = firebase.database().ref('messages')

export default {
  data() {
    return {
      content: '',
    }
  },
  methods: {
    post() {
      if (!this.content) {
        return
      }
      messagesRef.push({
        uid: this.$store.getters.authUserUid,
        timestamp: new Date().getTime(),
        displayName: this.$store.getters.authUserName,
        content: this.content,
      })
      this.content = ''
    },
  },
}
</script>

<style scoped lang="sass">
</style>
