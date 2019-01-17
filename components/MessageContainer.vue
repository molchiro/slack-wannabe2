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
      @new-message="scrollToEnd"
      ref="messageList"
      style="height: calc(90vh - 64px)"
    )
    MessagePost(style="height: 10vh")
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
  watch: {
    scrollTop: function() {
      const el = this.messageListEl
      const scrollBottom = el.scrollHeight - el.offsetHeight - this.scrollTop
      this.isScrolledToEnd = el ? scrollBottom === 0 : false
    },
    isScrolledToEnd: async function() {
      if (this.isScrolledToEnd) {
        await this.sleep(3000)
        if (this.isScrolledToEnd) {
          this.$store.dispatch('auth/readUntil', new Date().getTime())
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
      await this.sleep(1000)
      this.scrollTop = this.messageListEl.scrollTop
    },
    scrollToEnd() {
      const el = this.messageListEl
      el.scrollTop = el.scrollHeight
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
