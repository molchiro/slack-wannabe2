<template lang="pug">
  .container
    textarea.textarea(v-model="content")
    .button(@click='post') send
</template>

<script>
import { mapState } from 'vuex'
import firebase from '~/plugins/firebase.js'
const messagesRef = firebase.database().ref('messages')

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
    post() {
      if (!this.content) {
        return
      }
      this.$store.dispatch('messages/push', {
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
