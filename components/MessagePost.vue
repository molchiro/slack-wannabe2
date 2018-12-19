<template lang="pug">
  v-bottom-sheet(inset v-model="sheet")
    v-btn(
      block
      slot="activator"
      color='primary'
      v-model="valid"
    ) 発言する
    v-card
      v-container
        v-form(lazy-validation ref="post")
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
            :disabled="!valid"
            @click='postMessage'
          ) 送信
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      content: '',
      sheet: false,
      rules: [v => v !== '' || 'メッセージは空欄不可です'],
    }
  },
  methods: {
    postMessage() {
      if (this.$refs.post.validate()) {
        this.$store.dispatch('auth/readUntil', new Date().getTime())
        this.$store.dispatch('messages/add', this.content)
        this.$refs.post.reset()
        this.sheet = false
      }
    },
  },
}
</script>
