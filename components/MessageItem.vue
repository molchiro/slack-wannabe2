<template lang="pug">
  v-list-tile
    v-list-tile-content
      v-list-tile-title {{ message.data.displayName}}
      v-list-tile-sub-title.text--primary(v-html="formatNewLine(message.data.content)" )
    v-list-tile-action
      v-list-tile-action-text {{ message.data.timestamp | formatUNIXtime }}
      v-btn(@click='deleteMessage') 削除
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
