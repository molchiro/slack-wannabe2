<template lang="pug">
  .container
    .message-item
    | {{ message.val.displayName}}
    | {{ message.val.timestamp | formatUNIXtime }}
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
}
</script>

<style scoped lang="sass">
  .message-item
</style>
