<template lang="pug">
  .container
    .message-item
    |{{ message.val.displayName }}
    |{{ message.val.content }}
</template>

<script>
export default {
  props: {
    message: Object,
  },
}
</script>

<style scoped lang="sass">
  .message-item
</style>
