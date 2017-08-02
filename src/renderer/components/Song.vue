<template>
  <div class="song-container"
    :class="{selected: song.isSelected}"
    >
    <button class="button play-button" @click="playPause()"><i class="fa fa-play"></i></i></button>
    <div class="song-infos">
      <div class="song-title">
        {{ song.title }}
      </div>
      <div class="song-artist">
        {{ song.artist}}
      </div>
    </div>
    <div class="song-actions">
      <!--<button class="inline-button button select" @click="select()">
        Select
      </button>-->
      <button class="inline-button button like" @click="like()">
        <i class="fa fa-heart"></i>
      </button>
      <!--<button class="inline-button button remove" @click="remove()">
        Remove
      </button>-->
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
button i.fa {
  font-size: 0.75em;
}
.song-container {
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 10px 30px;
  margin: 2px auto;
  border-radius: 3px;

  border: 1px solid lightgray;
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

.song-container.reverse.selected {
  background-color: rgba(255, 255, 255, 0.1);
}

.song-container.shrink {
  padding: 8px 3px;
}

.song-container.selected {
  background-color: rgba(120, 120, 120, 0.1);
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
  display: flex;
  flex-flow: row nowrap;
  margin-left: auto;
}

</style>
