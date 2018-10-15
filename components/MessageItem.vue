<template lang="pug">
  .container
    .message-item
    | {{ message.val.displayName}}
    | {{ message.val.timestamp | formatUNIXtime }}
    .button(@click='deleteMe') delete
    br
    | {{ message.val.content | formatNewLine }}
</template>

<script>
import format from 'date-fns/format'

export default {
  filters: {
    formatUNIXtime(UNIXtime) {
      return format(UNIXtime, 'YYYY-MM-DD HH:mm')
    },
    formatNewLine(str) {
      return str.replace(/\n/g, '<br>')
    },
  },
  props: {
    message: Object,
  },
  methods: {
    deleteMe() {
      this.$emit('deleteMessage', this.message.key)
    },
  },
}
</script>

<style scoped lang="sass">
  .message-item
</style>
