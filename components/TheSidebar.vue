<template lang="pug">
  v-navigation-drawer(app clipped)
    v-list
      v-list-tile.room-tile(
        v-for="room in rooms"
        :key="room.id"
        @click="selectRoom(room.id)"
        ripple
        :color="room.id === selectedRoomID ? 'blue' : 'black'"
      )
        v-list-tile-content
          v-badge.room-badge(left)
            span.caption(
              v-if="notifications[room.id] && notifications[room.id].number > 0"
              slot="badge"
              ) {{ notifications[room.id].number }}
            v-list-tile-title {{ room.name }}
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('rooms', ['rooms', 'selectedRoomID']),
    ...mapState('notifications', ['notifications']),
  },
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

<style scoped lang="sass">
  .room-badge
    margin-left: 18pt
</style>
