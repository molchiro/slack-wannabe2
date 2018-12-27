<template lang="pug">
  .scroll-y(ref="messageListCard")
    v-btn.scroll-btn(absolute fab small color="primary" @click='scrollToEnd')
      v-icon(dark) keyboard_arrow_down
    v-list(two-line)
      div(
        v-for="(message, index) in messages"
        :key="message.id"
      )
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
    ...mapState('rooms', ['selectedRoomID']),
  },
  watch: {
    selectedRoomID: function() {
      this.$store.dispatch('messages/stopListener')
      this.$store.dispatch('messages/startListener')
      this.scrollToEnd()
    },
  },
  mounted() {
    this.$store.dispatch('messages/startListener')
    this.scrollToEnd()
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
    scrollToEnd() {
      const container = this.$refs.messageListCard
      container.scrollTop = container.scrollHeight
    },
  },
}
</script>

<style scoped lang="sass">
  .scroll-btn
    top: 0pt
    right: 0pt
    margin: 20pt
</style>
