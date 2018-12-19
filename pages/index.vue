<template lang="pug">
  v-layout
    TheSidebar
    v-layout(column)
      MessageList.scroll-y(style="height: calc(90vh - 64px)")
      MessagePost(style="height: 10vh")
</template>

<script>
import MessageList from '~/components/MessageList'
import MessagePost from '~/components/MessagePost'
import TheSidebar from '~/components/TheSidebar'

export default {
  components: {
    MessageList,
    MessagePost,
    TheSidebar,
  },
}
</script>
