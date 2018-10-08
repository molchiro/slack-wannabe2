<template lang="pug">
  .container
    messageItem(
      v-for="message in messages"
      :key="message.key"
      :message="message"
      )
</template>

<script>
import MessageItem from '~/components/MessageItem'

export default {
  components: {
    MessageItem,
  },
  data() {
    return {
      messages: [
        {
          key: 1,
          content: 'foo',
        },
        {
          key: 2,
          content: 'bar',
        },
        {
          key: 3,
          content: 'baz',
        },
      ],
    }
  },
}
</script>

<style scoped lang="sass">
</style>
