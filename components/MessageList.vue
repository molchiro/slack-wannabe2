<template lang="pug">
  div
    div(
      v-for="(message, index) in messages"
      :key="message.id"
    )
      v-card(v-if="index === 0 || isNewDay(message, messages[index - 1])")
        v-divider
        v-subheader {{ UNIXtimeToDate(message.data.timestamp) }}
      MessageItem(:message="message")
</template>

<script>
import { mapState } from 'vuex'
import MessageItem from '~/components/MessageItem'
import format from 'date-fns/format'
export default {
  components: {
    MessageItem,
  },
  computed: {
    ...mapState('messages', ['messages']),
    ...mapState('rooms', ['selectedRoomID']),
  },
  watch: {
    selectedRoomID: function() {
      this.$store.dispatch('messages/stopListener')
      this.$store.dispatch('messages/startListener')
    },
  },
  updated() {
    this.$emit('new-message')
  },
  mounted() {
    this.$store.dispatch('messages/startListener')
  },
  beforeDestroy() {
    this.$store.dispatch('messages/stopListener')
  },
  methods: {
    UNIXtimeToDate(UNIXtime) {
      return format(UNIXtime, 'YYYY-MM-DD')
    },
    isNewDay(currentMessage, prevMessage) {
      const getDate = message => this.UNIXtimeToDate(message.data.timestamp)
      return getDate(currentMessage) !== getDate(prevMessage)
    },
  },
}
</script>
