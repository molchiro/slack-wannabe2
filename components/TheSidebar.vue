<template lang="pug">
  v-navigation-drawer
    v-list
      v-list-tile(
        v-for="room in rooms"
        :key="room.id"
        @click=""
      )
        v-list-tile-content
          v-list-tile-title {{ room.name }}
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState('rooms', ['rooms']),
  mounted() {
    this.$store.dispatch('rooms/initRooms')
  },
}
</script>
