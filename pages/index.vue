<template lang="pug">
  v-layout
    TheSidebar
    MessageContainer(v-if="selectedRoomID")
    v-card(v-else height="100vh" width="100vw")
       v-layout(align-center justify-center  fill-height) roomを選択してください
</template>

<script>
import MessageContainer from '~/components/MessageContainer'
import TheSidebar from '~/components/TheSidebar'
import { mapState } from 'vuex'
export default {
  components: {
    MessageContainer,
    TheSidebar,
  },
  computed: {
    ...mapState('rooms', ['selectedRoomID']),
  },
}
</script>
