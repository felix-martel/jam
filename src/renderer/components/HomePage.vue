<template>
  <div class="page">

    <div class="library-wrapper">

      <library></library>
    </div>

    <div class="queue-wrapper">
      <queue></queue>
    </div>

    <div class="player-wrapper">
      <player></player>
    </div>
  </div>
</template>

<script>
import Library from './Library'
import Queue from './Queue'
import Player from './Player'
import Song from './Song'

export default {
  components: {
    Library,
    Queue,
    Player,
    Song
  }
}
</script>

<style>
  body {
    background-color: lightgray;
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

  .player-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 300px;
    height: 100px;
  }
</style>
