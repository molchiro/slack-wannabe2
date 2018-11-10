<template lang="pug">
  v-layout(column)
    MessageList.scroll-y(style="max-height: 45vw")
    v-bottom-sheet(inset v-model="sheet" style="max-height: 5vw")
      v-btn(block slot="activator" color='primary') 発言する
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
