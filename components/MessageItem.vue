<template lang="pug">
  v-list-tile(@click='readUntil')
    v-list-tile-content
      v-badge(v-model="isNew" color="red lighten-3")
        span.caption(slot="badge") new
        v-list-tile-title {{ message.data.displayName}}
      v-badge
      v-list-tile-sub-title.text--primary(v-html="formatNewLine(message.data.content)" )
    v-list-tile-action
      v-list-tile-action-text {{ message.data.timestamp | formatUNIXtime }}
      v-btn(@click='deleteMessage') 削除
</template>

<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState('auth', ['authedUser']),
    isNew() {
      return this.message.data.timestamp > this.authedUser.readUntil
    },
  },
  methods: {
    readUntil() {
      this.$store.dispatch('auth/readUntil', this.message.data.timestamp)
    },
    deleteMessage() {
      this.$store.dispatch('messages/delete', this.message)
    },
    formatNewLine(str) {
      return str.replace(/\n/g, '<br>')
    },
  },
}
</script>
