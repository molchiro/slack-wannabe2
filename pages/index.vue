<template lang="pug">
  v-layout(column)
    MessageList.scroll-y(style="height: calc(90vh - 64px)")
    MessagePost(style="height: 10vh")
</template>

<script>
import MessageList from '~/components/MessageList'
import MessagePost from '~/components/MessagePost'

export default {
  components: {
    MessageList,
    MessagePost,
  },
}
</script>
