<template lang="pug">
  v-card
    v-list(two-line)
      div(
        v-for="(message, index) in messages"
        :key="message.id"
      )
        div(v-if="message.data.timestamp > authedUser.readUntil")
          div 未読
        div(v-if="index === 0 || isNewDay(message, messages[index - 1])")
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
    ...mapState('auth', ['authedUser']),
  },
  mounted() {
    this.$store.dispatch('messages/startListener')
  },
  destroyed() {
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

<style scoped lang="sass">
</style>
