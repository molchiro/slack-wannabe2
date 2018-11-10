<template lang="pug">
  v-card
    v-list(two-line)
      MessageItem(
        v-for="message in messages"
        :key="message.id"
        :message="message"
      )
</template>

<script>
import { mapState } from 'vuex'
import MessageItem from '~/components/MessageItem'

export default {
  components: {
    MessageItem,
  },
  computed: mapState('messages', ['messages']),
  mounted() {
    this.$store.dispatch('messages/startListener')
  },
  destroyed() {
    this.$store.dispatch('messages/stopListener')
  },
}
</script>

<style scoped lang="sass">
</style>
