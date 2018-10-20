<template lang="pug">
  .container
    MessageItem(
      v-for="message in messages"
      :key="message.key"
      :message="message"
      @deleteMessage="deleteMessage"
    )
</template>

<script>
import { mapState } from 'vuex'
import firebase from '~/plugins/firebase.js'
import MessageItem from '~/components/MessageItem'
const messagesRef = firebase.database().ref('messages')

export default {
  components: {
    MessageItem,
  },
  computed: mapState('messages', ['messages']),
  mounted() {
    this.$store.dispatch('messages/startListeners')
  },
  destroyed() {
    this.$store.dispatch('messages/stopListeners')
  },
  methods: {
    deleteMessage(targetMessageKey) {
      messagesRef.child(targetMessageKey).remove()
    },
  },
}
</script>

<style scoped lang="sass">
</style>
