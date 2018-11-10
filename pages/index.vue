<template lang="pug">
  v-layout(column)
    MessageList.scroll-y(style="height: 45vw")
    MessagePost(style="height: 5vw")
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
