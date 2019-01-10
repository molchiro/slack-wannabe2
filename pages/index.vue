<template lang="pug">
  v-layout
    TheSidebar
    v-layout(v-if="selectedRoomID" column)
      MessageList.scroll-y(style="height: calc(90vh - 64px)")
      MessagePost(style="height: 10vh")
    v-card(v-else height="100vh" width="100vw")
       v-layout(align-center justify-center  fill-height) roomを選択してください
</template>

<script>
import MessageList from '~/components/MessageList'
import MessagePost from '~/components/MessagePost'
import TheSidebar from '~/components/TheSidebar'
import { mapState } from 'vuex'
export default {
  components: {
    MessageList,
    MessagePost,
    TheSidebar,
  },
  computed: {
    ...mapState('rooms', ['selectedRoomID']),
  },
}
</script>
