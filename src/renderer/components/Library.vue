<template>
  <div class="library-container">
      <h1 class="library-location-title"> >>></h1>
      <div class="buttons-bar">
        <button class="button add-to-queue" @click="addToQueue()">Add to queue</button>
        <button class="button add-to-playlist">Add to playlist</button>
        <button class="button create-playlist">Create playlist</button>
        <button class="button clear-selected" @click="clearSelectedList()">Clear selection</button>
      </div>
      <div class="list-song-container">
        <song
          v-for="(song, index) in songs"
          draggable="true"
          v-on:dragstart.native="dragstartHandler($event, index)"

          :key="index"
          :song="song"
          @click.native="dispatchSongClick(index, $event)"
          @toggle-selected="toggleSelected(index)"
          @removed="removeElement(index)"
          >
        </song>
      </div>
    </div>
</template>

<script>
import Song from './Song'

export default {
  components: {Song},
  methods: {
    dragstartHandler: function (e, i) {
      if (this.selectedList.length === 0) this.addToSelected(i)
      if (!this.isSelected(i)) {
        this.clearSelectedList()
        this.addToSelected(i)
      }
      e.dataTransfer.setData('text/JSON', JSON.stringify(this.getSongsFromSelectedList()))
    },
    // Click handling
    dispatchSongClick: function (i, e) {
      if (e.metaKey) {
        this.onSongControlClick(i)
      } else if (e.shiftKey) {
        this.onSongShiftClick(i)
      } else {
        this.onSongClick(i)
      }
    },
    onSongControlClick: function (i) {
      this.addToSelected(i)
      this.lastClick = i
    },
    onSongShiftClick: function (i) {
      if (this.lastClick) {
        // Prevent out of bound exception if library size changed
        this.lastClick = Math.min(this.lastClick, this.songs.length)
        this.lastClick = Math.max(this.lastClick, 0)
      } else {
        this.lastClick = 0
      }
      this.selectBetween(this.lastClick, i)
      this.lastClick = i
    },
    onSongClick: function (i) {
      if (this.isSelected(i) && this.selectedList.length === 1) {
        this.removeFromSelected(i)
      } else {
        this.clearSelectedList()
        this.lastClick = i
        this.addToSelected(i)
      }
    },
    // Utils
    isSelected: function (i) {
      return (this.songs[i] && this.songs[i].isSelected)
    },
    // Queue interactions
    getSongsFromSelectedList: function () {
      // Transform selectedList (list of indices) into a list of song objects
      let songList = []
      this.selectedList.forEach(i => songList.push(this.songs[i]))
      return songList
    },
    addToQueue: function () {
      this.$store.commit('append', this.getSongsFromSelectedList())

      this.clearSelectedList()
    },
    // Selection handling
    clearSelectedList: function () {
      while (this.selectedList.length) {
        // Remove last element
        this.removeFromSelected(this.selectedList[this.selectedList.length - 1])
      }
    },
    toggleSelected: function (i) {
      if (this.songs[i].isSelected) {
        this.removeFromSelected(i)
      } else {
        this.addToSelected(i)
      }
    },
    addToSelected: function (i) {
      // console.log("Selecting song")
      // Prevent adding the same song multiple times
      if (!this.isSelected(i)) this.selectedList.push(i)
      this.$store.commit('selectSongInLibrary', i)
    },
    selectBetween: function (i, j) {
      if (i > j) [i, j] = [j, i]
      for (let k = i; k <= j; k++) {
        this.addToSelected(k)
      }
    },
    removeFromSelected: function (i) {
      let index = this.selectedList.indexOf(i)
      if (index >= 0) this.selectedList.splice(index, 1)
      this.$store.commit('unselectSongInLibrary', i)
    },
    removeElement: function (i) {
    }
  },
  data: function () {
    return {
      selectedList: []
    }
  },
  computed: {
    songs: function () {
      return this.$store.state.Library.songs
    }
  }
}
</script>

<style>
.library-container {
  background-color: white;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}
.library-location-title {
  margin: 0;
  font-family: sans-serif;
}
.buttons-bar {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
}
</style>
