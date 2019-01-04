<template lang="pug">
  v-navigation-drawer
    v-list
      v-list-tile(
        v-for="room in rooms"
        :key="room.id"
        @click="selectRoom(room.id)"
        ripple
        :color="room.id === selectedRoomID ? 'blue' : 'black'"
      )
        v-list-tile-content
          v-list-tile-title {{ room.name }}
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState('rooms', ['rooms', 'selectedRoomID']),
  mounted() {
    this.$store.dispatch('rooms/initRooms')
    this.$store.dispatch('notifications/startListener')
  },
  beforeDestroy() {
    this.$store.dispatch('notifications/stopListener')
  },
  methods: {
    selectRoom(roomID) {
      this.$store.dispatch('rooms/selectRoom', roomID)
    },
  },
}
</script>
