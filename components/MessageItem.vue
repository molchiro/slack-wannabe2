<template lang="pug">
    v-card.py-2(column)
      v-flex
        v-layout(align-center row)
          v-flex(shrink)
            v-badge(v-model="isNew" color="red lighten-3")
              span.caption(slot="badge") new
              v-card-text.subheading.py-0 {{ message.data.displayName}}
          v-flex(grow)
            v-card-text.caption.grey--text.py-0 {{ message.data.timestamp | formatTimestamp }}
          v-flex(shrink)
            v-icon.pr-2(v-if='message.data.uid === authedUser.uid' @click='deleteMessage') delete
      v-card-text.pt-0.pb-0(v-html="formatNewLine(message.data.content)" )
</template>

<script>
import { mapState } from 'vuex'
import format from 'date-fns/format'

export default {
  filters: {
    formatTimestamp(UNIXtime) {
      return format(UNIXtime, 'HH:mm')
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
