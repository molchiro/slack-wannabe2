<template lang="pug">
  v-card(column)
    v-flex
      v-layout(row)
        v-flex(xs2)
          v-badge(v-model="isNew" color="red lighten-3")
            span.caption(slot="badge") new
            div {{ message.data.displayName}}
        v-flex(grow)
          div {{ message.data.timestamp | formatUNIXtime }}
        v-flex(shrink)
          v-icon(v-if='message.data.uid === authedUser.uid' @click='deleteMessage') delete
    v-flex
      v-card
        v-container(v-html="formatNewLine(message.data.content)" )
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
