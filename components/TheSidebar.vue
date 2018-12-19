<template lang="pug">
  v-navigation-drawer
    v-list
      v-list-tile(
        v-for="room in rooms"
        :key="room.id"
        @click="selectRoom(room.id)"
      )
        v-list-tile-content
          v-list-tile-title {{ room.name }}
          span(v-if="room.id === selectedRoomID") 選択中
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState('rooms', ['rooms', 'selectedRoomID']),
  mounted() {
    this.$store.dispatch('rooms/initRooms')
  },
  methods: {
    selectRoom(roomID) {
      this.$store.dispatch('rooms/selectRoom', roomID)
    },
  },
}
</script>
