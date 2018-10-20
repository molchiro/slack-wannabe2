<template lang="pug">
  .container
    MessageItem(
      v-for="message in messages"
      :key="message.key"
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
    this.$store.dispatch('messages/startListeners')
  },
  destroyed() {
    this.$store.dispatch('messages/stopListeners')
  },
}
</script>

<style scoped lang="sass">
</style>
