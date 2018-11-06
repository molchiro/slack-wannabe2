<template lang="pug">
  v-container
    MessageList.scroll-y(style="max-height: 45vw")
    MessagePost(style="max-height: 5vw")
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

<style scoped lang="sass">
</style>
