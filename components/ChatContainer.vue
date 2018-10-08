<template lang="pug">
  .container
    messageList
    messagePost
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
