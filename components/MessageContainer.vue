<template lang="pug">
  v-layout(column)
    v-btn.scroll-btn(
      v-show="isScrolledToEnd === false"
      absolute
      fab
      small
      color="primary"
      @click='scrollToEnd'
    )
      v-icon(dark) keyboard_arrow_down
    MessageList.scroll-y(
      @new-message="newMessage"
      ref="messageList"
      style="height: calc(100vh - 112px)"
    )
    MessagePost
</template>

<script>
import { mapState } from 'vuex'
import MessageList from '~/components/MessageList'
import MessagePost from '~/components/MessagePost'
export default {
  components: {
    MessageList,
    MessagePost,
  },
  data() {
    return {
      scrollTop: 0,
      isScrolledToEnd: null,
      messageListEl: null,
    }
  },
  computed: {
    ...mapState('rooms', ['selectedRoomID']),
  },
  watch: {
    selectedRoomID: function() {
      this.isScrolledToEnd = null
    },
    scrollTop: function() {
      // スクロール位置を監視し、最下部であればthis.isScrolledToEndをtrue
      const el = this.messageListEl
      const scrollBottom = el.scrollHeight - el.offsetHeight - this.scrollTop
      this.isScrolledToEnd = el ? scrollBottom === 0 : false
    },
    isScrolledToEnd: async function() {
      // スクロール位置が最下部を2秒キープしたとき、既読をつける
      if (this.isScrolledToEnd) {
        await this.sleep(2000)
        if (this.isScrolledToEnd) {
          this.$store.dispatch('notifications/checked')
        }
      }
    },
  },
  mounted() {
    this.messageListEl = this.$refs.messageList.$el
    this.messageListEl.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    this.messageListEl.removeEventListner('scroll', this.handleScroll)
  },
  methods: {
    sleep(msec) {
      return new Promise(resolve => setTimeout(resolve, msec))
    },
    async handleScroll() {
      await this.sleep(50)
      this.scrollTop = this.messageListEl.scrollTop
    },
    scrollToEnd() {
      const el = this.messageListEl
      el.scrollTop = el.scrollHeight
    },
    newMessage() {
      if (this.isScrolledToEnd !== false) {
        this.isScrolledToEnd = false
        this.scrollToEnd()
      }
    },
  },
}
</script>

<style scoped lang="sass">
  .scroll-btn
    top: 0pt
    right: 0pt
    margin: 20pt
</style>
