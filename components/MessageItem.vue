<template lang="pug">
  .container
    .message-item
    | {{ message.val.displayName}}
    | {{ message.val.timestamp | formatUNIXtime }}
    .button(@click='deleteMessage') 削除
    div(v-html="formatNewLine(message.val.content)")
</template>

<script>
import format from 'date-fns/format'

export default {
  filters: {
    formatUNIXtime(UNIXtime) {
      return format(UNIXtime, 'YYYY-MM-DD HH:mm')
    },
  },
  props: {
    message: Object,
  },
  methods: {
    deleteMessage() {
      this.$store.dispatch('messages/delete', this.message)
    },
    formatNewLine(str) {
      return str.replace(/\n/g, '<br>')
    },
  },
}
</script>

<style scoped lang="sass">
  .message-item
</style>
