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
    messagesRef.on('child_added', snapshot => {
      this.$store.commit('messages/pushMessage', {
        key: snapshot.key,
        val: snapshot.val(),
      })
    })
    messagesRef.on('child_removed', removedMessage => {
      this.$store.commit('messages/removeMessage', removedMessage)
    })
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
