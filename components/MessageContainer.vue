<template lang="pug">
  v-layout(column)
    v-btn.scroll-btn(
      absolute
      fab
      small
      color="primary"
      @click='scrollToEnd'
    )
      v-icon(dark) keyboard_arrow_down
    MessageList.scroll-y(
      @new-message="scrollToEnd"
      ref="messageContainer"
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
      messageListEl: null,
    }
  },
  computed: {
    ...mapState('rooms', ['selectedRoomID']),
  },
  watch: {
    selectedRoomID: function() {
      this.$store.dispatch('messages/stopListener')
      this.$store.dispatch('messages/startListener')
    },
  },
  mounted() {
    this.messageListEl = this.$refs.messageContainer.$el
    this.$store.dispatch('messages/startListener')
  },
  beforeDestroy() {
    this.$store.dispatch('messages/stopListener')
  },
  methods: {
    scrollToEnd() {
      this.messageListEl.scrollTop = this.messageListEl.scrollHeight
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
