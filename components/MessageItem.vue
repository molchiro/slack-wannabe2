<template lang="pug">
  div
    div
      v-badge(v-model="isNew" color="red lighten-3")
        span.caption(slot="badge") new
        div {{ message.data.displayName}}
      v-badge
      div.text--primary(v-html="formatNewLine(message.data.content)" )
    div
      div {{ message.data.timestamp | formatUNIXtime }}
      v-btn(v-if='message.data.uid === authedUser.uid' @click='deleteMessage') 削除
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
    ...mapState('notifications', ['notifications']),
    isNew() {
      const data = this.message.data
      return data.timestamp > this.notifications[data.roomID].checkedAt
    },
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
