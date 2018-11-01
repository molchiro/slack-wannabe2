<template lang="pug">
  div
    MessageList
    v-bottom-sheet(v-model="sheet")
      v-btn(slot="activator" color='primary') 発言する

      MessagePost
</template>

<script>
import MessageList from '~/components/MessageList'
import MessagePost from '~/components/MessagePost'

export default {
  components: {
    MessageList,
    MessagePost,
  },
  data() {
    return {
      sheet: false,
    }
  },
}
</script>

<style scoped lang="sass">
</style>
