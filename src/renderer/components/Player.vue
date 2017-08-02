<template>
  <div class="player-container"
  >
    <audio id="player"
      :src="currentSource"
      @timeupdate="updatePlaybackProgress()"
      @durationchange="updatePlaybackDuration()"
      @canplay="onCanPlay()"
      @ended="onSongEnd()"
    ></audio>
    <template v-if="current">

      <div class="player-left">
        <div class="now-playing-infos">
          <h1 class="now-playing-title">
            {{ current.title }}
          </h1>
          <h3 class="now-playing-artist">
            {{ current.artist}}
          </h3>
          <p>{{ playbackProgress }} / {{ playbackMax }}</p>
        </div>
      </div>

      <div class="player-right">
        <div class="playback-infos">
          <div class="playback-bar">
            <div class="playback-progress" :style="{transform: this.playbackPercentage}"></div>
          </div>
        </div>
        <div class="playback-controls">
          <button class="button" @click="previous()">Previous</button>
          <button class="button" @click="playPause()">Play/Pause</button>
          <button class="button" @click="next()">Next</button>
        </div>
      </div>
    </template>
    <template v-if="!current">
      <em>Empty player</em>
    </template>
  </div>

</template>

<script>
import Song from './Song'
import {mapGetters} from 'vuex'

export default {
  components: {Song},
  methods: {
    initAudio: function () {
      this.audio = document.querySelector('audio#player')
      this.updatePlaybackDuration()
    },

    onCanPlay: function () {
      this.updatePlaybackDuration()
      if (this.shouldBePlaying) this.audio.play()
    },

    onSongEnd: function () {
      this.next()
    },

    isPlaying: function () {
      if (this.audio.paused) return false
      if (this.audio.currentTime === 0) return false
      return true
    },

    updatePlaybackProgress: function () {
      this.playbackProgress = this.audio.currentTime
    },

    updatePlaybackDuration: function () {
      this.playbackMax = this.audio.duration
    },

    playPause: function () {
      if (this.isPlaying()) {
        this.pause()
      } else {
        this.play()
      }
    },

    play: function () {
      this.audio.play()
      this.shouldBePlaying = true
    },

    pause: function () {
      this.audio.pause()
      this.shouldBePlaying = false
    },

    next: function () {
      // Load next song
      this.$store.commit('next')

      // Special case : we've reached the end of the queue
      if (this.$store.state.Queue.hasReachedEnd) {
        // We move to start
        this.$store.commit('goTo', 0)
        // We stop playing
        this.pause()
        this.shouldBePlaying = false
      }
    },

    previous: function () {
      // Load previous song
      this.$store.commit('previous')

      // Special case : we've reached the beginning of the queue
      if (this.$store.state.Queue.hasReachedStart) {
        // Going to beginning of the song
        this.$store.commit('goToMoment', 0)
        this.audio.currentTime = 0
        this.updatePlaybackDuration()
        this.updatePlaybackProgress()
      }
    }

  },

  data: function () {
    return {
      playbackMax: 0,
      playbackProgress: 0,
      audio: undefined,
      shouldBePlaying: false
    }
  },

  mounted () {
    this.initAudio()
  },

  computed: {
    currentSource: function () {
      return this.current ? this.current.url : ''
    },
    playbackPercentage: function () {
      let percent = Math.floor((this.playbackProgress / this.playbackMax) * 100) - 100
      let result = 'translateX(' + percent + '%)'
      return result
    },
    ...mapGetters({
      current: 'current'
    })
  }
}
</script>

<style>

.player-container {
  background-color: transparent;
  color: black;
  height: 100%;
  width: 100%;

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.now-playing-infos {
  margin: 4px auto;

  h1 {
    margin: 0;
    font-size: 1em;
  }

  h3 {
    margin: 0;
    font-size: 0.5em;
    font-style: italic;
  }

  p {
    margin: 0;
    padding: 0;
    font-size: 0.25em;
  }
}

.playback-infos {
  padding: 10px;

  .playback-bar {
    height: 5px;
    width: 250px;
    background-color: white;
    overflow: hidden;

    .playback-progress {
      height: 100%;
      width: 100%;
      background-color: black;
      transition: transform 0.1s linear;
    }
  }
}
.playback-controls {
  margin: 2px auto;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
}
</style>
