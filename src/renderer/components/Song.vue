<template>
  <div class="song-container"
    :class="{selected: song.isSelected}"
    >
    <button class="button play-button" @click="playPause()">Play/Pause</button>
    <div class="song-infos">
      <div class="song-title">
        {{ song.title }}
      </div>
      <div class="song-artist">
        {{ song.artist}}
      </div>
    </div>
    <div class="song-actions">
      <button class="inline-button button select" @click="select()">
        Select
      </button>
      <button class="inline-button button like" @click="like()">
        Like
      </button>
      <button class="inline-button button remove" @click="remove()">
        Remove
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['song'],

  data: function () {
    return {
      isSelected: false
    }
  },

  methods: {
    playPause: function () {
      this.$emit('play-pause')
    },
    select: function () {
      this.$emit('toggle-selected')
    },
    like: function () {
      this.$emit('liked')
    },
    remove: function () {
      this.$emit('removed')
    }
  },

  computed: {
  }
}
</script>

<style>
.song-container {
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 10px 30px;
  margin: 0 auto;

  border: 2px solid black;
  font-family: sans-serif;
}

.song-container.reverse {
  color: white;
  border-color: white;

  button.button {
    border-color: white;
    color: white;
  }
}

.song-container.shrink {
  padding: 8px 3px;
}

.song-container.shrink.selected {
  padding: 6px 1px;
}

.song-container.selected {
  border-color: red;
}

.song-infos {
  margin-left: 20px;
  text-align: left;

  .song-artist {
    font-size: 0.5em;
    font-style: italic;
  }
}

.song-actions {
  margin-left: auto;
}

</style>
