<template lang="pug">
  .container
    messageItem(
      v-for="message in messages"
      :key="message.key"
      :message="message"
      @deleteMessage="deleteMessage"
    )
</template>

<script>
import firebase from '~/plugins/firebase.js'
import MessageItem from '~/components/MessageItem'
const messagesRef = firebase.database().ref('messages')

export default {
  components: {
    MessageItem,
  },
  data() {
    return {
      messages: [],
    }
  },
  mounted() {
    messagesRef.on('child_added', snapshot => {
      this.messages.push({
        key: snapshot.key,
        val: snapshot.val(),
      })
    })
    messagesRef.on('child_removed', removedMessage => {
      const removedMessageIndex = this.messages.findIndex(
        x => x.key === removedMessage.key
      )
      this.messages.splice(removedMessageIndex, 1)
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
