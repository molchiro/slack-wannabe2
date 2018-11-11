<template lang="pug">
  v-card
    v-list(two-line)
      div(
        v-for="message in messages"
        :key="message.id"
      )
        MessageItem(
          v-if="message.type==='message'"
          :message="message"
        )
        div(v-if="message.type==='dateDivider'")
          v-subheader {{ message.data }}
          v-divider
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
