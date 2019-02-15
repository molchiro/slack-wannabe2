<template lang="pug">
    v-card.px-3.py-2(column)
      v-flex
        v-layout(align-center row)
          v-flex(shrink)
            v-badge(v-model="showBadge" color="red lighten-3")
              span.caption(slot="badge") new
              div.subheading {{ message.data.displayName}}
          v-flex.pl-2(shrink)
            div.caption.grey--text {{ message.data.timestamp | formatTimestamp }}
          v-spacer
          v-flex(shrink)
            v-icon(v-if='isMine' @click='deleteMessage') delete
      v-flex
        div.break-word(v-html="htmlize(message.data.content)" )
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
    isMine() {
      return this.message.data.uid === this.authedUser.uid
    },
    showBadge() {
      return this.isNew && !this.isMine
    },
  },
  methods: {
    deleteMessage() {
      this.$store.dispatch('messages/delete', this.message)
    },
    formatNewLine(str) {
      return str.replace(/\n/g, '<br>')
    },
    createLink(str) {
      const regexpURL = /(https?:\/\/[-./?,#:%&=\w\u3001-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+)/
      const encloseInAnchorTag = (match, url, offset, string) => {
        return '<a href="' + url + '"target=”_blank”>' + url + '</a>'
      }
      return str.replace(regexpURL, encloseInAnchorTag)
    },
    htmlize(str) {
      let res = str
      res = this.formatNewLine(res)
      // res = this.createLink(res)
      return res
    },
  },
}
</script>

<style lang="sass" scoped>
  .break-word
    word-wrap: break-word
</style>
