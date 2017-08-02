<template>
  <div class="page">

    <div class="library-wrapper">

      <library
      v-on:dragstart.native="onDragStart"
      v-on:dragend.native="onDragEnd"
      ></library>
    </div>

    <div class="queue-wrapper" :class="{offset: displaySidebar}">
      <queue></queue>
    </div>

    <div class="sidebar-wrapper"  :class="{offset: displaySidebar}">
      <user-sidebar></user-sidebar>
    </div>

    <div class="player-wrapper">
      <player></player>
    </div>
  </div>
</template>

<script>
import Library from './Library'
import Queue from './Queue'
import UserSidebar from './UserSidebar'
import Player from './Player'
import Song from './Song'

export default {
  components: {
    Library,
    Queue,
    Player,
    Song,
    UserSidebar
  },
  methods: {
    onDragStart: function () {
      console.log('start')
      this.displaySidebar = true
    },
    onDragEnd: function () {
      console.log('end')
      this.displaySidebar = false
    }
  },
  data: function () {
    return {
      displaySidebar: false,
      draggingFromLibrary: false
    }
  }
}
</script>

<style>
  body {
    background-color: lightgray;
  }

  .page {
    overflow: hidden;
    position: fixed;
    top: 0;
    bottom: 100px;
    right: 300px;
    left: 0;
  }

  .library-wrapper {
    position: fixed;
    top: 0;
    bottom: 100px;
    right: 300px;
    left: 0;
  }

  .queue-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;

    width: 300px;
  }

  .sidebar-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    right: -300px;
    width: 300px;
  }
  .sidebar-wrapper.offset {
    right: 0;
    transition: right 0.4s ease-out;
  }
  .sidebar-wrapper:not(.offset), .queue-wrapper:not(.offset) {
    transition: right 0.4s ease-in;
  }

  .queue-wrapper.offset {
    right: 300px;
    transition: right 0.4s ease-out;
  }

  .player-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 300px;
    height: 100px;
  }
</style>
