<template lang="pug">

    v-card
      v-container
        v-textarea(
          outline
          label="内容"
          v-model="content"
          hint="メッセージを入力してください"
          persistent-hint
          :rules="rules"
        )
        v-btn(
          block
          :disabled="isContentEmpty"
          @click='postMessage'
        ) send
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      content: '',
      rules: [v => v.length > 0 || 'メッセージは空欄不可です'],
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
    }),
    isContentEmpty() {
      return this.content === ''
    },
  },
  methods: {
    postMessage() {
      this.$store.dispatch('messages/add', {
        uid: this.user.uid,
        timestamp: new Date().getTime(),
        displayName: this.user.displayName,
        content: this.content,
      })
      this.content = ''
      this.sheet = false
    },
  },
}
</script>
