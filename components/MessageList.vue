<template lang="pug">
  .container
    messageItem(
      v-for="message in messages"
      :key="message.key"
      :message="message.val"
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
  },
}
</script>

<style scoped lang="sass">
</style>
